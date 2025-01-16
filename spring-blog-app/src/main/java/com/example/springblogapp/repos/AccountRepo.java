package com.example.springblogapp.repos;

import com.example.springblogapp.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {
    @Query("SELECT t FROM Account t WHERE t.email = ?1")
    Optional<Account> findOneByEmail(String email);
}
