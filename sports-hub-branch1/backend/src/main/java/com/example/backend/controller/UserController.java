// src/main/java/com/example/backend/controller/UserController.java
package com.example.backend.controller;

// UserSignUpRequestDto는 AuthController로 이동했으므로 여기서 제거
import com.example.backend.dto.user.UserProfileUpdateDto;
import com.example.backend.dto.user.UserResponseDto;
import com.example.backend.dto.user.PublicUserProfileResponseDto; // ✅ 추가: 공개 프로필 DTO 임포트
import com.example.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
// import org.springframework.http.HttpStatus; // 현재 코드에서 직접 사용 안 함
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication; // Authentication 객체 직접 사용 권장
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails; // UserDetails는 username만 제공
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원 전체 조회 (관리자 권한 필요 - 추후 Spring Security로 제어)
    @GetMapping
    // @PreAuthorize("hasRole('ADMIN')") // 예시: 관리자만 접근 가능
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // 내 정보 조회
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMyInfo() {
        // SecurityContextHolder에서 직접 사용자 ID (username으로 저장된 것) 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = authentication.getName(); // 보통 User 엔티티의 userid 필드 값

        UserResponseDto currentUserDto = userService.getUserProfileByUserId(currentUserId);
        return ResponseEntity.ok(currentUserDto);
    }

    // ✅ 다른 사용자 공개 프로필 정보 조회 API 엔드포인트 추가
    @GetMapping("/{userId}/profile")
    public ResponseEntity<PublicUserProfileResponseDto> getUserProfile(@PathVariable Long userId) {
        PublicUserProfileResponseDto userProfile = userService.getPublicUserProfileById(userId);
        return ResponseEntity.ok(userProfile);
    }

    // 내 정보 수정
    @PutMapping("/me")
    public ResponseEntity<UserResponseDto> updateMyInfo(
            @RequestBody @Valid UserProfileUpdateDto updateDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = authentication.getName();

        UserResponseDto updatedUserDto = userService.updateProfileByUserId(currentUserId, updateDto);
        return ResponseEntity.ok(updatedUserDto);
    }

    // 사용자 삭제 (탈퇴)
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMyAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = authentication.getName();

        userService.deleteUserByUserId(currentUserId);
        return ResponseEntity.noContent().build();
    }
}