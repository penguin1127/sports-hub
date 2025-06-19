// src/main/java/com/example/backend/controller/TeamPostController.java
package com.example.backend.controller;

import com.example.backend.dto.team.TeamPostResponseDto;
import com.example.backend.entity.User;
import com.example.backend.service.TeamPostService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class TeamPostController {

    private final TeamPostService teamPostService;
    private final UserService userService; // 사용자 정보를 가져오기 위해 주입

    @GetMapping("/{postId}")
    public ResponseEntity<TeamPostResponseDto> getPostDetail(@PathVariable Long postId,
                                                             @AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = null;
        // 비로그인 사용자도 상세보기를 할 수 있도록 userDetails가 null일 경우를 처리
        if (userDetails != null) {
            currentUser = userService.findUserByLoginId(userDetails.getUsername());
        }

        TeamPostResponseDto postDto = teamPostService.getPostDetail(postId, currentUser);
        return ResponseEntity.ok(postDto);
    }
}