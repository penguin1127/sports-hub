// src/main/java/com/example/backend/controller/UserController.java (재확인용)
package com.example.backend.controller;

import com.example.backend.dto.user.UserSignUpRequestDto; // 사용되지 않음 (AuthController로 이관)
import com.example.backend.dto.user.UserProfileUpdateDto;
import com.example.backend.dto.user.UserResponseDto;
import com.example.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원 전체 조회 (관리자용 또는 개발용)
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // 내 정보 조회
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMyInfo() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentUserId = userDetails.getUsername();

        UserResponseDto currentUserDto = userService.getUserProfileByUserId(currentUserId);
        return ResponseEntity.ok(currentUserDto);
    }

    // 내 정보 수정
    @PutMapping("/me")
    public ResponseEntity<UserResponseDto> updateMyInfo(
            @RequestBody @Valid UserProfileUpdateDto updateDto) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentUserId = userDetails.getUsername();

        UserResponseDto updatedUserDto = userService.updateProfileByUserId(currentUserId, updateDto);
        return ResponseEntity.ok(updatedUserDto);
    }

    // 사용자 삭제 (탈퇴)
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMyAccount() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentUserId = userDetails.getUsername();

        userService.deleteUserByUserId(currentUserId);
        return ResponseEntity.noContent().build();
    }
}