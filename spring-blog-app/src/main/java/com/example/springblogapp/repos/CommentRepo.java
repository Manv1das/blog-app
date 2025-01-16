package com.example.springblogapp.repos;

import com.example.springblogapp.models.Account;
import com.example.springblogapp.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Integer> {
}
