// src/main/java/com/example/backend/controller/AuthController.java
package com.example.backend.controller;

import com.example.backend.dto.auth.AuthLoginResponseDto; // 새로 정의할 로그인 응답 DTO
import com.example.backend.dto.user.UserLoginRequestDto; // 로그인 요청 DTO
import com.example.backend.dto.user.UserResponseDto; // 사용자 정보 응답 DTO
import com.example.backend.dto.user.UserSignUpRequestDto; // 회원가입 요청 DTO
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService; // UserService 주입
import jakarta.validation.Valid; // @Valid 어노테이션을 위해 import
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 인증 관련 API를 처리하는 컨트롤러
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService; // UserService 주입

    /**
     * 회원가입 요청 처리
     * @param signUpDto 사용자 회원가입 요청 DTO
     * @return 회원가입 성공 메시지 (UserResponseDto로 변경 가능)
     */
    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signup(@RequestBody @Valid UserSignUpRequestDto signUpDto) {
        UserResponseDto registeredUser = userService.signUp(signUpDto); // UserService로 위임
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser); // 201 Created
    }

    /**
     * 로그인 요청 처리
     * @param loginDto 로그인 요청 DTO(loginId, password)
     * @return JWT 토큰 + 사용자 정보 포함 응답
     */
    @PostMapping("/login")
    public ResponseEntity<AuthLoginResponseDto> login(@RequestBody @Valid UserLoginRequestDto loginDto) {
        AuthLoginResponseDto response = authService.login(loginDto); // AuthService에서 JWT 토큰과 UserResponseDto 반환
        return ResponseEntity.ok(response);
    }
}