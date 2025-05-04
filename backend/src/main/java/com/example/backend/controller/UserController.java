package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 회원 전체 조회
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 새 사용자 등록
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
