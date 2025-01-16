package com.example.springblogapp.services;

import com.example.springblogapp.models.Comment;
import com.example.springblogapp.repos.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;

    public Comment save(Comment comment) {
        comment.setCommentedTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss")));
        return commentRepo.save(comment);
    }
}
