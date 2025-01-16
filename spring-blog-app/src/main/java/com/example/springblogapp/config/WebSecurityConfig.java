package com.example.springblogapp.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.nio.file.AccessDeniedException;
import java.util.Arrays;
import java.util.List;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;
import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class WebSecurityConfig {

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .csrf(csrf -> csrf .ignoringRequestMatchers(toH2Console()))
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll();
                    auth.requestMatchers(antMatcher("/css/**")).permitAll();
                    auth.requestMatchers(antMatcher("/js/**")).permitAll();
                    auth.requestMatchers(antMatcher("/images/**")).permitAll();
                    auth.requestMatchers(antMatcher("/fonts/**")).permitAll();
                    auth.requestMatchers(antMatcher("/webjars/**")).permitAll();
                    auth.requestMatchers(antMatcher("/posts")).permitAll();
                    auth.requestMatchers(antMatcher("/rss/**")).permitAll();
                    auth.requestMatchers(antMatcher("/register/**")).permitAll();
                    //auth.requestMatchers(antMatcher("/posts/**")).permitAll();
                    auth.requestMatchers(antMatcher("/h2-console/**")).hasRole("ADMIN");
                    //auth.requestMatchers(antMatcher("/")).permitAll();
                    // eto udalit
                    auth.requestMatchers(HttpMethod.POST, "/posts/**").authenticated();
                    auth.requestMatchers(HttpMethod.GET, "/posts/**").permitAll();
                    //
                    auth.requestMatchers(toH2Console()).permitAll();
                    //auth.requestMatchers(HttpMethod.POST, "/posts/new").authenticated();
                    //auth.requestMatchers(HttpMethod.POST, "/posts/**/like").authenticated();
                    //auth.anyRequest().permitAll();
                    //auth.anyRequest().authenticated();
                })

                /*.exceptionHandling(exception -> {
                    exception
                            .accessDeniedHandler((request, response, accessDeniedException) -> {
                                response.sendRedirect("/denied");
                            });
                        }
                ) */

                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        //.defaultSuccessUrl("/posts", true)
                        .successHandler(customAuthenticationSuccessHandler())
                        .failureHandler(customAuthenticationFailureHandler())
                        //.failureUrl("/login?error")
                        /*.failureHandler((request, response, exception) -> {
                            response.setStatus(403); // Set HTTP status to 403
                        }) */
                        .permitAll()
                );

                http.csrf(csrf -> csrf.disable());

                //http.cors(cors->cors.disable());
                http.headers(headers -> headers.frameOptions(f -> f.disable()));
                http.sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                );



        return http.build();
    }

    public AuthenticationSuccessHandler customAuthenticationSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }

    public AuthenticationFailureHandler customAuthenticationFailureHandler() {
        return new CustomAuthenticationFailureHandler();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }



}
