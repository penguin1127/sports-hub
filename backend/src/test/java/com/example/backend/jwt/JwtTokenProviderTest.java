// src/test/java/com/example/backend/jwt/JwtTokenProviderTest.java

package com.example.backend.jwt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        // 테스트를 위해 의존성 주입 없이 직접 객체 생성
        jwtTokenProvider = new JwtTokenProvider();

        // 1. Setter를 사용해 테스트용 비밀키와 유효시간 설정
        String secret = "mytokentestsecretkeytobeusedforjwtauthenticationlongenoughtobevalid"; // 32바이트 이상의 긴 문자열
        long expiration = 1000 * 60 * 60; // 1시간

        jwtTokenProvider.setSecretKey(secret);
        jwtTokenProvider.setTokenValidityInMs(expiration);

        // 2. 수동으로 init() 메소드 호출하여 signingKey 생성
        jwtTokenProvider.init();
    }

    @Test
    void 토큰_생성_및_검증() {
        // Given: 테스트할 사용자 정보
        String username = "testuser";
        String role = "ROLE_USER";

        // When: 토큰 생성
        String token = jwtTokenProvider.generateToken(username, role);
        assertNotNull(token); // 토큰이 null이 아니어야 함

        // Then: 토큰 검증
        boolean isValid = jwtTokenProvider.validateToken(token);
        assertTrue(isValid); // 토큰이 유효해야 함

        // Then: 토큰에서 정보 추출 및 확인
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        assertNotNull(authentication);

        String extractedUsername = authentication.getName();
        String extractedRole = authentication.getAuthorities().iterator().next().getAuthority();

        assertEquals(username, extractedUsername);
        assertEquals(role, extractedRole);
    }
}