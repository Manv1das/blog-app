package com.example.springblogapp.services;

import com.example.springblogapp.models.Post;
import com.example.springblogapp.repos.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;

    public Optional<Post> getById(Integer id) {
        return postRepo.findById(id);
    }

    public List<Post> getAll() {
        return postRepo.findAll();
    }

    public List<Post> getAllSortedByDate() {
        return postRepo.findAllByOrderByPostedTimeDesc();
    }

    public List<Post> getAllSortedByLikes() {
        return postRepo.findAllByLikes();
    }

    public Post save(Post post) {
        if (post.getId() == null) {
            post.setPostedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss")));
        }
        post.setUpdatedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss")));
        return postRepo.save(post);
    }

    public void delete(Post post) {
        postRepo.delete(post);
    }
}
