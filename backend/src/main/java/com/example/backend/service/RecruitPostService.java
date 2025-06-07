package com.example.backend.service;

import com.example.backend.entity.RecruitPost;
import com.example.backend.entity.User; // User 엔티티를 사용할 경우 필요
import com.example.backend.repository.RecruitPostRepository;
import com.example.backend.dto.auth.RecruitPostResponseDto; // DTO import 경로 (recruit 패키지 안에 있다면)
import com.example.backend.enums.RecruitCategory; // RecruitCategory enum import
import com.example.backend.enums.RecruitStatus;   // RecruitStatus enum import (필요하다면)
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page; // Page import
import org.springframework.data.domain.Pageable; // Pageable import
import org.springframework.stereotype.Service;

import java.time.LocalDate; // LocalDate import (필요하다면)
import java.util.List;
import java.util.stream.Collectors;

/**
 * RecruitPost 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class RecruitPostService {

    private final RecruitPostRepository recruitPostRepository;

    /**
     * 전체 모집글 조회
     * Repository의 findAll() 메서드에 @EntityGraph가 적용되어 있어,
     * 엔티티 조회 시 작성자(author) 정보가 함께 EAGER 로딩됩니다.
     * 이후 엔티티를 DTO로 변환하여 반환합니다.
     */
    public List<RecruitPostResponseDto> getAllPosts() {
        List<RecruitPost> recruitPosts = recruitPostRepository.findAll();
        return recruitPosts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 특정 모집글 조회
     * Repository의 findById() 메서드에 @EntityGraph가 적용되어 있어,
     * 엔티티 조회 시 작성자(author) 정보가 함께 EAGER 로딩됩니다.
     * 이후 엔티티를 DTO로 변환하여 반환합니다.
     */
    public RecruitPostResponseDto getPostById(Long id) {
        RecruitPost recruitPost = recruitPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 모집글이 존재하지 않습니다. ID=" + id));
        return convertToDto(recruitPost);
    }

    /**
     * 모집글 생성
     */
    public RecruitPostResponseDto createPost(RecruitPost post) {
        RecruitPost savedPost = recruitPostRepository.save(post);
        return convertToDto(savedPost);
    }

    /**
     * 모집글 삭제
     */
    public void deletePost(Long id) {
        recruitPostRepository.deleteById(id);
    }

    /**
     * 카테고리별 모집글 목록 조회 (페이징 포함)
     * RecruitPostRepository에 findByCategory(RecruitCategory category, Pageable pageable) 메서드가 정의되어 있어야 합니다.
     */
    public Page<RecruitPostResponseDto> getPostsByCategory(RecruitCategory category, Pageable pageable) {
        // RecruitPostRepository에 이 메서드가 정의되어 있어야 합니다.
        Page<RecruitPost> recruitPostsPage = recruitPostRepository.findByCategory(category, pageable);
        return recruitPostsPage.map(this::convertToDto);
    }

    // --- 기타 필요할 수 있는 서비스 메서드 (선택 사항) ---
    // 작성자로 게시글 조회 (페이징 없이 모든 게시글)
    public List<RecruitPostResponseDto> getPostsByAuthor(User author) {
        List<RecruitPost> recruitPosts = recruitPostRepository.findByAuthor(author);
        return recruitPosts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 지역으로 게시글 조회 (페이징 포함)
    public Page<RecruitPostResponseDto> getPostsByRegion(String region, Pageable pageable) {
        Page<RecruitPost> recruitPostsPage = recruitPostRepository.findByRegion(region, pageable);
        return recruitPostsPage.map(this::convertToDto);
    }

    // 세부 지역으로 게시글 조회 (페이징 포함)
    public Page<RecruitPostResponseDto> getPostsBySubRegion(String subRegion, Pageable pageable) {
        Page<RecruitPost> recruitPostsPage = recruitPostRepository.findBySubRegion(subRegion, pageable);
        return recruitPostsPage.map(this::convertToDto);
    }

    // 상태로 게시글 조회 (페이징 포함)
    public Page<RecruitPostResponseDto> getPostsByStatus(RecruitStatus status, Pageable pageable) {
        Page<RecruitPost> recruitPostsPage = recruitPostRepository.findByStatus(status, pageable);
        return recruitPostsPage.map(this::convertToDto);
    }

    // 날짜로 게시글 조회 (페이징 포함)
    public Page<RecruitPostResponseDto> getPostsByGameDate(LocalDate gameDate, Pageable pageable) {
        Page<RecruitPost> recruitPostsPage = recruitPostRepository.findByGameDate(gameDate, pageable);
        return recruitPostsPage.map(this::convertToDto);
    }

    // 제목 또는 내용에 키워드가 포함된 게시글 조회 (검색 기능)
    public Page<RecruitPostResponseDto> searchPosts(String keyword, Pageable pageable) {
        Page<RecruitPost> recruitPostsPage = recruitPostRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
        return recruitPostsPage.map(this::convertToDto);
    }

    // 복합 조건 필터링 예시
    public Page<RecruitPostResponseDto> getPostsByCategoryAndRegionAndStatus(RecruitCategory category, String region, RecruitStatus status, Pageable pageable) {
        Page<RecruitPost> recruitPostsPage = recruitPostRepository.findByCategoryAndRegionAndStatus(category, region, status, pageable);
        return recruitPostsPage.map(this::convertToDto);
    }

    // 작성자 ID로 게시글 존재 여부 확인 (DTO 반환은 아님)
    public boolean existsByAuthorId(Long authorId) {
        return recruitPostRepository.findByAuthorId(authorId).isPresent();
    }


    /**
     * RecruitPost 엔티티를 RecruitPostResponseDto로 변환하는 헬퍼 메서드
     * @param recruitPost 변환할 RecruitPost 엔티티
     * @return 변환된 RecruitPostResponseDto
     */
    private RecruitPostResponseDto convertToDto(RecruitPost recruitPost) {
        Long authorId = null;
        String authorName = null;
        if (recruitPost.getAuthor() != null) {
            authorId = recruitPost.getAuthor().getId();
            authorName = recruitPost.getAuthor().getName();
        }

        return RecruitPostResponseDto.builder()
                .id(recruitPost.getId())
                .title(recruitPost.getTitle())
                .content(recruitPost.getContent())
                .region(recruitPost.getRegion())
                .subRegion(recruitPost.getSubRegion())
                .thumbnailUrl(recruitPost.getThumbnailUrl())
                .category(recruitPost.getCategory())
                .targetType(recruitPost.getTargetType())
                .fromParticipant(recruitPost.getFromParticipant())
                .toParticipant(recruitPost.getToParticipant())
                .gameDate(recruitPost.getGameDate())
                .gameTime(recruitPost.getGameTime())
                .status(recruitPost.getStatus())
                .requiredPersonnel(recruitPost.getRequiredPersonnel())
                .ageGroup(recruitPost.getAgeGroup())
                .preferredPositions(recruitPost.getPreferredPositions())
                .matchRules(recruitPost.getMatchRules())
                .minPlayers(recruitPost.getMinPlayers())
                .maxPlayers(recruitPost.getMaxPlayers())
                .authorId(authorId)
                .authorName(authorName)
                .createdAt(recruitPost.getCreatedAt())
                .updatedAt(recruitPost.getUpdatedAt())
                .build();
    }
}