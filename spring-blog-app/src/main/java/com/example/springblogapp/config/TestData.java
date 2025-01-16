package com.example.springblogapp.config;

import com.example.springblogapp.controllers.PostController;
import com.example.springblogapp.models.*;
import com.example.springblogapp.repos.AuthorityRepo;
import com.example.springblogapp.services.AccountService;
import com.example.springblogapp.services.CommentService;
import com.example.springblogapp.services.LikeService;
import com.example.springblogapp.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class TestData implements CommandLineRunner {

    @Autowired
    PostService postService;

    @Autowired
    AccountService accountService;

    @Autowired
    AuthorityRepo authorityRepository;

    @Autowired
    CommentService commentService;

    @Autowired
    LikeService likeService;

    @Override
    public void run(String... args) throws Exception {
        List<Post> posts = postService.getAll();

        if (posts.size() == 0) {

            Authority user = new Authority();
            user.setName("ROLE_USER");
            authorityRepository.save(user);

            Authority admin = new Authority();
            admin.setName("ROLE_ADMIN");
            authorityRepository.save(admin);


            Account account1 = new Account();
            Account account2 = new Account();

            account1.setFirstname("John");
            account1.setLastname("Johnson");
            account1.setEmail("john@mail.com");
            account1.setPassword("asdf");
            Set<Authority> authoritySet1 = new HashSet<>();
            authorityRepository.findById("ROLE_USER").ifPresent(authoritySet1::add);
            account1.setAuthorities(authoritySet1);

            account2.setFirstname("Darius");
            account2.setLastname("Mickus");
            account2.setEmail("dar@mail.com");
            account2.setPassword("1111");
            Set<Authority> authoritySet2 = new HashSet<>();
            authorityRepository.findById("ROLE_USER").ifPresent(authoritySet2::add);
            authorityRepository.findById("ROLE_ADMIN").ifPresent(authoritySet2::add);
            account2.setAuthorities(authoritySet2);

            accountService.save(account1);
            accountService.save(account2);




            Post post1 = new Post();
            post1.setTitle("AAaaaaaaaaa");
            post1.setBody("aaaaaaaaaaaaaaaaa");
            post1.setAccount(account1);

            Post post2 = new Post();
            post2.setTitle("Jinujbncjubne");
            post2.setBody("seedexex");
            post2.setAccount(account2);

            postService.save(post1);
            try {
                // Sleep for 3 seconds (3000 milliseconds)
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                // Handle the exception if the sleep is interrupted
                System.out.println("Sleep was interrupted.");
            }
            postService.save(post2);

            Comment comment1 = new Comment();
            Comment comment2 = new Comment();

            comment1.setAccount(account1);
            comment2.setAccount(account2);
            comment1.setContent("Ploho");
            comment2.setContent("Da ne norm");
            comment1.setPost(post1);
            comment2.setPost(post1);

            commentService.save(comment1);
            commentService.save(comment2);


            PostLike like1 = new PostLike();
            like1.setAccount(account1);
            like1.setPost(post1);

            likeService.save(like1);

        }
    }
}
