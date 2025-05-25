// src/main/java/com/example/backend/service/AuthService.java
package com.example.backend.service;

import com.example.backend.dto.auth.AuthLoginResponseDto; // AuthLoginResponseDto 임포트
import com.example.backend.dto.user.UserLoginRequestDto;
import com.example.backend.dto.user.UserResponseDto; // UserResponseDto 임포트
import com.example.backend.entity.User;
import com.example.backend.exception.InvalidCredentialsException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.jwt.JwtTokenProvider;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    // 로그인
    public AuthLoginResponseDto login(UserLoginRequestDto loginDto) { // UserResponseDto -> AuthLoginResponseDto로 변경
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        User user = userRepository.findByUserid(loginDto.getLoginId())
                .or(() -> userRepository.findByEmail(loginDto.getLoginId()))
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        String token = jwtTokenProvider.generateToken(user.getUserid(), user.getRole());

        // AuthLoginResponseDto를 사용하여 토큰과 사용자 정보를 함께 반환
        return AuthLoginResponseDto.builder()
                .token(token)
                .user(UserResponseDto.fromEntity(user)) // User 엔티티를 UserResponseDto로 변환
                .build();
    }
}