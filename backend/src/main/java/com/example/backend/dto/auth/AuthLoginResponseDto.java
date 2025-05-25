// src/main/java/com/example/backend/dto/AuthLoginResponseDto.java
package com.example.backend.dto.auth;

import com.example.backend.dto.user.UserResponseDto; // UserResponseDto import
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

/**
 * 로그인 성공 시 JWT 토큰과 사용자 정보를 함께 응답으로 전달하는 DTO
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthLoginResponseDto {
    private String token; // JWT 토큰
    private UserResponseDto user; // 사용자 정보 DTO
}