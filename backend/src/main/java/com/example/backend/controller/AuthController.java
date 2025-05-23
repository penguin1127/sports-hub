package com.example.backend.controller;

import com.example.backend.dto.AuthRequestDTO;
import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
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

    /**
     * 회원가입 요청 처리
     * @param request 사용자 입력값(userid, password)
     * @return 회원가입 성공 메시지
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody AuthRequestDTO request) {
        authService.signUp(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    /**
     * 로그인 요청 처리
     * @param request 로그인 요청 DTO(userid, password)
     * @return JWT 토큰 + 사용자 정보 포함 응답
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        // AuthService에서 사용자 정보와 JWT 토큰을 포함한 DTO를 반환
        return ResponseEntity.ok(authService.login(request));
    }
}
