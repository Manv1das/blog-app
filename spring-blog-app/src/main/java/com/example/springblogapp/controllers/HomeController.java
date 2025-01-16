package com.example.springblogapp.controllers;

import org.springframework.ui.Model;
import com.example.springblogapp.models.Post;
import com.example.springblogapp.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class HomeController {
    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    public List<Post> getPosts() {
        List<Post> posts = postService.getAll();
        Collections.reverse(posts);
        return posts;
    }

}
