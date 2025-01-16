package com.example.springblogapp.services;

import com.example.springblogapp.models.Account;
import com.example.springblogapp.models.Post;
import com.example.springblogapp.models.PostLike;
import com.example.springblogapp.repos.LikeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepo likeRepo;

    public boolean exist(Post post, Account account) {
        return likeRepo.existsByPostAndAccount(post, account);
    }

    public PostLike save(PostLike like) {
        return likeRepo.save(like);
    }
    public void remove(PostLike like) {
        likeRepo.delete(like);
    }

    public Optional<PostLike> findByPostAndAccount(Post post, Account account) {
        return likeRepo.findByPostAndAccount(post, account);
    }
}
