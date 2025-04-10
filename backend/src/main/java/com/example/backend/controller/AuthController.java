package com.example.backend.controller;

import com.example.backend.dto.AuthRequestDTO;
import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 회원가입 API
     * URL: POST /api/auth/signup
     * Body: { "username": "testuser", "password": "testpass" }
     */
    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody AuthRequestDTO request) {
        authService.signUp(request);
        return ResponseEntity.ok().build();
    }

    /**
     * 로그인 API
     * URL: POST /api/auth/login
     * Body: { "username": "testuser", "password": "testpass" }
     * 응답: { "token": "eyJhbGciOi..." }
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        AuthResponseDTO response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
