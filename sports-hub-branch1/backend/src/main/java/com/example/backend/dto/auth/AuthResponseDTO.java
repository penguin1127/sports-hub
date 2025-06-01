package com.example.backend.dto.auth;

import com.example.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
/**
 * 로그인 성공 시 JWT 토큰을 응답으로 전달하는 DTO
 */
@Getter
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
    private User user;
}