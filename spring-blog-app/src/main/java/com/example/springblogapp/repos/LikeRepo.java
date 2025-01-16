package com.example.springblogapp.repos;

import com.example.springblogapp.models.Account;
import com.example.springblogapp.models.Post;
import com.example.springblogapp.models.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepo extends JpaRepository<PostLike, Integer> {
    boolean existsByPostAndAccount(Post post, Account account);

    Optional<PostLike> findByPostAndAccount(Post post, Account account);
}
