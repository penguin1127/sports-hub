package com.example.backend.jwt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;

    private final String secret = "mytestsecretkeythatissufficientlylong123456"; // 32바이트 이상
    private final long expiration = 1000 * 60 * 60; // 1시간

    @BeforeEach
    void setUp() {
        jwtTokenProvider = new JwtTokenProvider();
        jwtTokenProvider.setSecret(secret);
        jwtTokenProvider.setValidityInMilliseconds(expiration);
        jwtTokenProvider.init();
    }

    @Test
    void 토큰_생성_및_검증() {
        String username = "testuser";
        String role = "ROLE_USER";

        String token = jwtTokenProvider.generateToken(username, role);

        boolean isValid = jwtTokenProvider.validateToken(token);
        String extractedUsername = jwtTokenProvider.getUsernameFromToken(token);
        String extractedRole = jwtTokenProvider.getRoleFromToken(token);

        assertThat(isValid).isTrue();
        assertThat(extractedUsername).isEqualTo(username);
        assertThat(extractedRole).isEqualTo(role);
    }
}
