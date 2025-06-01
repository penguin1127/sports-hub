package com.example.backend.controller;

import com.example.backend.entity.RecruitPost;
import com.example.backend.service.RecruitPostService;
import com.example.backend.dto.auth.RecruitPostResponseDto;
import com.example.backend.enums.RecruitCategory; // RecruitCategory enum import
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page; // Page import
import org.springframework.data.domain.Pageable; // Pageable import
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
     * 모집글 생성
     */
    @PostMapping
    public ResponseEntity<RecruitPostResponseDto> createPost(@RequestBody RecruitPost recruitPost) {
        return ResponseEntity.ok().body(recruitPostService.createPost(recruitPost));
    }

    /**
     * 모집글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        recruitPostService.deletePost(id);
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

    // 다른 필터링/검색 엔드포인트도 필요하다면 유사하게 추가할 수 있습니다.
}