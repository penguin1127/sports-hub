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

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public void signUp(AuthRequestDTO request) {
        if (userRepository.existsByUserid(request.getUserid())) {
            throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
        }

        User user = User.builder()
                .userid(request.getUserid())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .name("기본이름") // 필수 칼럼 대응
                .email(request.getUserid() + "@test.com") // 임시값
                .build();

        userRepository.save(user);
    }

    public AuthResponseDTO login(AuthRequestDTO request) {
        System.out.println("📥 로그인 요청 도착:");
        System.out.println("  - userid: " + request.getUserid());
        System.out.println("  - password(raw): " + request.getPassword());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserid(), request.getPassword())
        );

        User user = userRepository.findByUserid(request.getUserid())
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        String token = jwtTokenProvider.generateToken(user.getUserid(), user.getRole());
        return new AuthResponseDTO(token, user);  // ✅ 사용자 정보도 함께 응답
    }
}
