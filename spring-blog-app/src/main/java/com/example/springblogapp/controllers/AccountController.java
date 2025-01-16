package com.example.springblogapp.controllers;

import com.example.springblogapp.models.Account;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import com.example.springblogapp.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/users")
    public ResponseEntity<?> getAccounts() {
        try {
            List<Account> accountList = accountService.findAll();

            if (accountList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of(
                        "message", "No users found"
                ));
            }

            return ResponseEntity.ok(accountList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "An error occurred while fetching the user list",
                    "error", e.getMessage()
            ));
        }
    }
}
