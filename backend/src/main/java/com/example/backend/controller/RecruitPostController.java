package com.example.backend.controller;

import com.example.backend.entity.RecruitPost;
import com.example.backend.service.RecruitPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * RecruitPost 관련 API 엔드포인트를 정의하는 컨트롤러
 */
@RestController
@RequestMapping("/api/recruit-posts")
@RequiredArgsConstructor
public class RecruitPostController {

    private final RecruitPostService recruitPostService;

    /**
     * 전체 모집글 목록 조회
     */
    @GetMapping
    public ResponseEntity<List<RecruitPost>> getAllPosts() {
        return ResponseEntity.ok(recruitPostService.getAllPosts());
    }

    /**
     * 특정 모집글 조회 (ID 기반)
     */
    @GetMapping("/{id}")
    public ResponseEntity<RecruitPost> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(recruitPostService.getPostById(id));
    }

    /**
     * 모집글 생성
     */
    @PostMapping
    public ResponseEntity<RecruitPost> createPost(@RequestBody RecruitPost recruitPost) {
        return ResponseEntity.ok(recruitPostService.createPost(recruitPost));
    }

    /**
     * 모집글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        recruitPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
