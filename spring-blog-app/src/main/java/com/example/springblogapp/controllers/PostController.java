package com.example.springblogapp.controllers;

import com.example.springblogapp.models.Account;
import com.example.springblogapp.models.Comment;

import com.example.springblogapp.models.Post;
import com.example.springblogapp.models.PostLike;
import com.example.springblogapp.services.AccountService;
import com.example.springblogapp.services.CommentService;
import com.example.springblogapp.services.LikeService;
import com.example.springblogapp.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class PostController {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private PostService postService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private LikeService likeService;

    @GetMapping("/posts/sortByLikes")
    public List<Post> sortByLikes(Model model) {
        List<Post> posts = postService.getAllSortedByLikes();
        return posts;
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<?> getPost(@PathVariable Integer id) {
        Optional<Post> optionalPost = postService.getById(id);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();

            Map<String, Object> response = new HashMap<>();
            response.put("post", post);
            response.put("numLikes", post.getLikes().size());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }
    }

    @PostMapping("/posts/new")
    @ResponseBody
    public ResponseEntity<?> createNewPost(@RequestBody Post post) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(email);
        try {
            Optional<Account> optionalAccount = accountService.findByEmail(email);

            if (optionalAccount.isPresent()) {
                Account account = optionalAccount.get();

                post.setAccount(account);
                post.setPostedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss")));
                post.setUpdatedTime(post.getPostedTime());

                Post savedPost = postService.save(post);

                return ResponseEntity.ok(savedPost);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the post");
        }
    }

    //@PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/posts/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> updatePost(@PathVariable Integer id, @RequestBody Post post) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Authenticated user email: " + email);

        Optional<Account> optionalAccount = accountService.findByEmail(email);
        if (optionalAccount.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        Account account = optionalAccount.get();

        Optional<Post> optionalPost = postService.getById(id);
        if (optionalPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }

        Post existingPost = optionalPost.get();

        if (!existingPost.getAccount().getId().equals(account.getId()) && !account.getAuthorities().stream().anyMatch(authority -> authority.getName().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to edit this post");
        }

        existingPost.setTitle(post.getTitle());
        existingPost.setBody(post.getBody());
        existingPost.setUpdatedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss")));

        postService.save(existingPost);

        return ResponseEntity.ok(existingPost);
    }

    @DeleteMapping("posts/{id}/delete")
    public ResponseEntity<?> deletePost(@PathVariable Integer id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Authenticated user email: " + email);
        System.out.println("wajwajwaj");

        Optional<Account> optionalAccount = accountService.findByEmail(email);
        if (optionalAccount.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        Account account = optionalAccount.get();

        Optional<Post> optionalPost = postService.getById(id);
        if (optionalPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }

        Post existingPost = optionalPost.get();

        if (!existingPost.getAccount().getId().equals(account.getId()) && !account.getAuthorities().stream().anyMatch(authority -> authority.getName().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to edit this post");
        }

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            postService.delete(post);
            return ResponseEntity.ok("Post deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }
    }

    @PostMapping("/posts/{id}/comment")
    //@PreAuthorize("isAuthenticated()")
    public String postComment(@PathVariable Integer id, Comment comment, Model model, Authentication user) {

        Optional<Post> optionalPost = postService.getById(id);
        if (optionalPost.isPresent()) {
            comment.setAccount(accountService.findByEmail(user.getName()).get());
            Post post = optionalPost.get();
            comment.setPost(post);
            post.addComment(comment);
            commentService.save(comment);
            model.addAttribute("post", post);
            model.addAttribute("comment", new Comment());
            return "post";
        } else {
            return "404";
        }
    }

    @PostMapping("posts/{id}/like")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> likePost(@PathVariable Integer id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("ffff");
        System.out.println(email);
        Optional<Post> optionalPost = postService.getById(id);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();

            Optional<Account> accountOptional = accountService.findByEmail(email);

            if (accountOptional.isEmpty()) { throw  new RuntimeException("User not found");}

            Account account = accountOptional.get();

            boolean alreadyLiked = likeService.exist(post, account);
            if (!alreadyLiked) {
                PostLike like = new PostLike();
                like.setPost(post);
                like.setAccount(account);
                likeService.save(like);
            } else {
                likeService.remove(likeService.findByPostAndAccount(post, account)
                        .orElseThrow(() -> new RuntimeException("Like not found")));
            }

            int numLikes = post.getLikes().size();
            boolean userLiked = likeService.exist(post, account);

            return ResponseEntity.ok(Map.of(
                    "numLikes", numLikes,
                    "userLiked", userLiked
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Post not found");
        }
    }

}
