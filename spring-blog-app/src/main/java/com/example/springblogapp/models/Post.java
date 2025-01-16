package com.example.springblogapp.models;

import com.example.springblogapp.services.LikeService;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer Id;

    private String title;

    @Column(columnDefinition = "Text")
    private String body;

    private String postedTime;

    private String updatedTime;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false)
    //@JsonBackReference
    private Account account;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonBackReference
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonBackReference
    private List<PostLike> likes = new ArrayList<>();

    public Post(Integer id, String title, String body) {
        this.Id = id;
        this.title = title;
        this.body = body;
    };

    public Post(String title, String body) {
        this.title = title;
        this.body = body;
    };

    public Post() {

    }


    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public String getUpdatedTime() {
        return updatedTime;
    }
    public void setUpdatedTime(String updatedTime) {
        this.updatedTime = updatedTime;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Integer getId() {
        return Id;
    }

    public void setPostedTime(String postedTime) {
        this.postedTime = postedTime;
    }

    public String getPostedTime() {
        return postedTime;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Account getAccount() {
        return account;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public List<PostLike> getLikes() {
        return likes;
    }

    public void addLikes(PostLike like) {
        this.likes.add(like);
    }

    public void setId(Integer id) {
        Id = id;
    }
}
