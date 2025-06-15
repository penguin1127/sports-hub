// src/main/java/com/example/backend/config/WebSecurityConfig.java
package com.example.backend.config;

import com.example.backend.security.CustomUserDetailsService;
import com.example.backend.jwt.JwtAuthenticationEntryPoint;
import com.example.backend.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // @PreAuthorize, @PostAuthorize 등 어노테이션 기반 보안 활성화
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; //  추가: JWT 인증 진입점
    private final CustomUserDetailsService customUserDetailsService; //  추가: 사용자 상세 서비스

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // 추가: DaoAuthenticationProvider 정의
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // CSRF 비활성화 간소화 (람다 표현식)
                .cors(cors -> {}) // CORS 설정 적용 (기본 빈 CorsFilter를 사용할 경우)
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint) // 추가: 인증되지 않은 사용자 접근 시 처리
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 사용 안 함
                .authorizeHttpRequests(auth -> auth
                        // 인증 없이 접근 허용하는 경로
                        .requestMatchers("/api/auth/**").permitAll() // 회원가입, 로그인 등 인증 관련 API
                        .requestMatchers("/api/users/check-email").permitAll() // 이메일 중복 체크
                        .requestMatchers("/api/users/check-userid").permitAll() // 사용자 ID 중복 체크
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/teams").permitAll() // 모든 팀 목록 조회 (GET 요청)
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/teams/{teamId}").permitAll() // 특정 팀 상세 조회 (GET 요청)

                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/users/{userId}/profile").permitAll() // 다른 사용자 공개 프로필 조회

                        .requestMatchers(HttpMethod.GET, "/api/recruit-posts/**").permitAll() // 기존 RecruitPost API 유지
                        // 특정 역할만 접근 허용하는 경로 (예시, 필요에 따라 추가)
                        // .requestMatchers("/api/admin/**").hasRole("ADMIN") // ADMIN 권한만 접근 가능
                        // .requestMatchers("/api/some-protected-resource").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated() // 나머지 모든 요청은 인증 필요
                )
                // 추가: 인증 프로바이더 설정
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}