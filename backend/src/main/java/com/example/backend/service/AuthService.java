package com.example.backend.service;

import com.example.backend.dto.AuthRequestDTO;
import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.jwt.JwtTokenProvider;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 회원가입 처리
     */
    public void signUp(AuthRequestDTO request) {
        if (userRepository.existsByUserid(request.getUsername())) {
            throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
        }

        User user = User.builder()
                .userid(request.getUsername())
                .email(request.getEmail())  // ✅ null 방지
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .name("이름없음") // 필수값이므로 임시값 설정
                .build();

        userRepository.save(user);
    }

    /**
     * 로그인 처리 및 JWT 발급
     */
    public AuthResponseDTO login(AuthRequestDTO request) {
        // 인증 시도 (실패 시 예외 발생)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // 사용자 정보 조회
        User user = userRepository.findByUserid(request.getUsername()) // 여기서도 getUsername
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // JWT 생성
        String token = jwtTokenProvider.generateToken(user.getUserid(), user.getRole());

        return new AuthResponseDTO(token);
    }
}
