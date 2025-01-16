package com.example.springblogapp.services;

import com.example.springblogapp.models.Account;
import com.example.springblogapp.repos.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Account> findAll() {
        return accountRepo.findAll();
    }

    public Account save(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepo.save(account);
    }

    public Optional<Account> findByEmail(String email) {
        return accountRepo.findOneByEmail(email);
    }

}
