package com.example.backend.service;

import com.example.backend.entity.RecruitPost;
import com.example.backend.repository.RecruitPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * RecruitPost 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class RecruitPostService {

    private final RecruitPostRepository recruitPostRepository;

    /**
     * 전체 모집글 조회
     */
    public List<RecruitPost> getAllPosts() {
        return recruitPostRepository.findAll();
    }

    /**
     * 특정 모집글 조회
     */
    public RecruitPost getPostById(Long id) {
        return recruitPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 모집글이 존재하지 않습니다. ID=" + id));
    }

    /**
     * 모집글 생성
     */
    public RecruitPost createPost(RecruitPost post) {
        return recruitPostRepository.save(post);
    }

    /**
     * 모집글 삭제
     */
    public void deletePost(Long id) {
        recruitPostRepository.deleteById(id);
    }
}
