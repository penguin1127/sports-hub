package com.example.backend.controller;

import com.example.backend.dto.application.ApplicationResponseDto;
import com.example.backend.dto.auth.RecruitPostCreationRequest;

import com.example.backend.dto.auth.RecruitPostUpdateRequest;
import com.example.backend.service.RecruitPostService;
import com.example.backend.dto.auth.RecruitPostResponseDto;
import com.example.backend.enums.RecruitCategory; // RecruitCategory enum import
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page; // Page import
import org.springframework.data.domain.Pageable; // Pageable import
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.example.backend.dto.application.ApplicationRequestDto;
import com.example.backend.service.ApplicationService;

import java.util.List;

/**
 * RecruitPost 관련 API 엔드포인트를 정의하는 컨트롤러
 */
@RestController
@RequestMapping("/api/recruit-posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RecruitPostController {

    private final RecruitPostService recruitPostService;
    private final ApplicationService applicationService;
    /**
     * 전체 모집글 목록 조회
     * DTO 목록을 반환
     */
    @GetMapping
    public ResponseEntity<List<RecruitPostResponseDto>> getAllPosts() {
        return ResponseEntity.ok().body(recruitPostService.getAllPosts());
    }

    /**
     * 특정 모집글 조회 (ID 기반)
     * DTO를 반환
     */
    @GetMapping("/{id}")
    public ResponseEntity<RecruitPostResponseDto> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok().body(recruitPostService.getPostById(id));
    }

    /**
     * 모집글 생성 (수정된 버전)
     */
    @PostMapping
    public ResponseEntity<RecruitPostResponseDto> createPost(
            @RequestBody RecruitPostCreationRequest requestDto,
            @AuthenticationPrincipal UserDetails userDetails) { // ◀ 로그인한 사용자 정보 자동 주입

        // userDetails가 null이면 JWT 필터에서 이미 차단되지만, 안전을 위해 확인
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String currentLoginId = userDetails.getUsername();
        RecruitPostResponseDto createdPost = recruitPostService.createPost(requestDto, currentLoginId);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost); // ◀ 201 Created 상태 코드 반환
    }
    /*
     * 모집글 삭제 (권한 확인 로직 추가 버전)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        // 로그인한 사용자 ID를 서비스로 전달
        recruitPostService.deletePost(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    /**
     * 카테고리별 모집글 목록 조회 (페이징 포함)
     * 예: /api/recruit-posts/category/MERCENARY?page=0&size=10
     */
    @GetMapping("/category/{category}") // 새로운 엔드포인트 추가
    public ResponseEntity<Page<RecruitPostResponseDto>> getPostsByCategory(
            @PathVariable RecruitCategory category, // enum 타입으로 직접 바인딩
            Pageable pageable) { // 페이징 정보는 Pageable 객체로 자동 바인딩
        return ResponseEntity.ok().body(recruitPostService.getPostsByCategory(category, pageable));
    }

    /**
     * 모집글 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<RecruitPostResponseDto> updatePost(
            @PathVariable Long id,
            @RequestBody RecruitPostUpdateRequest requestDto,
            @AuthenticationPrincipal UserDetails userDetails) {

        RecruitPostResponseDto updatedPost = recruitPostService.updatePost(id, requestDto, userDetails.getUsername());
        return ResponseEntity.ok(updatedPost);
    }

    @PostMapping("/{postId}/apply")
    public ResponseEntity<ApplicationResponseDto> applyToPost(
            @PathVariable Long postId,
            @AuthenticationPrincipal UserDetails userDetails) {

        // ▼▼▼ 서비스의 메서드 이름을 applyAsMercenary로 변경 ▼▼▼
        ApplicationResponseDto newApplication = applicationService.applyAsMercenary(postId, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(newApplication);
    }
}