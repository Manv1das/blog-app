package com.example.springblogapp.repos;

import com.example.springblogapp.models.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepo  extends JpaRepository<Authority, String> {

}
