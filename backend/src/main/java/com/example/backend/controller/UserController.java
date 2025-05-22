package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder; // ✅ 추가: 비밀번호 인코딩을 위해 필요 (옵션)

import java.util.List;
import java.util.Optional; // ✅ 추가

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ 추가: 비밀번호 인코딩을 위해 주입 (선택 사항)

    // 회원 전체 조회
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 새 사용자 등록
    @PostMapping
    public User createUser(@RequestBody User user) {
        // 회원 가입 시 비밀번호는 AuthService에서 인코딩하므로 여기서는 필요 없음.
        return userRepository.save(user);
    }

    // 내 정보 조회
    @GetMapping("/me")
    public ResponseEntity<User> getMyInfo() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userid = userDetails.getUsername();
        User currentUser = userRepository.findByUserid(userid)
                .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

        return ResponseEntity.ok(currentUser);
    }

    // ✅ 내 정보 수정
    @PutMapping("/me") // 또는 @PatchMapping("/me")
    public ResponseEntity<User> updateMyInfo(@RequestBody User updatedUser) {
        // 1. 현재 인증된 사용자 정보 가져오기
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentUserId = userDetails.getUsername();

        // 2. DB에서 현재 사용자 찾기
        User existingUser = userRepository.findByUserid(currentUserId)
                .orElseThrow(() -> new RuntimeException("현재 사용자 정보를 찾을 수 없습니다."));

        // 3. 받은 updatedUser 정보로 기존 사용자 정보 업데이트
        //    (id, userid는 수정 불가하므로 제외)
        if (updatedUser.getName() != null && !updatedUser.getName().isEmpty()) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getRegion() != null) { // region은 null로 업데이트될 수 있음
            existingUser.setRegion(updatedUser.getRegion());
        }
        if (updatedUser.getPreferredPosition() != null) { // preferredPosition 필드로 접근
            existingUser.setPreferredPosition(updatedUser.getPreferredPosition()); // preferredPosition 필드로 설정
        }

        // 비밀번호는 별도의 API나 로직으로 처리하는 것이 일반적입니다.
        // 여기서는 프로필 업데이트 시 비밀번호는 수정하지 않는다고 가정합니다.
        // 만약 비밀번호도 업데이트하려면, passwordEncoder.encode(updatedUser.getPassword()) 사용 필요
        // if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
        //    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        // }


        // 4. 업데이트된 사용자 정보 저장
        User savedUser = userRepository.save(existingUser);

        return ResponseEntity.ok(savedUser);
    }
}