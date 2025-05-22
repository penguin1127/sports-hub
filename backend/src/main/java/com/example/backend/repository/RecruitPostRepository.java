// src/main/java/com/example/backend/repository/RecruitPostRepository.java
package com.example.backend.repository;

import com.example.backend.entity.RecruitPost;
import com.example.backend.entity.User; // 작성자 User 엔티티 import
import com.example.backend.enums.RecruitCategory; // ENUM import
import com.example.backend.enums.RecruitStatus;   // ENUM import
import org.springframework.data.domain.Page;         // 페이징 처리 import
import org.springframework.data.domain.Pageable;     // 페이징 처리 import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate; // 날짜 조회용 import
import java.util.List;
import java.util.Optional;

/**
 * RecruitPost 엔티티를 위한 JPA Repository 인터페이스
 * 게시글 조회, 필터링, 페이징 기능 제공
 */
@Repository
public interface RecruitPostRepository extends JpaRepository<RecruitPost, Long> {

    // 작성자로 게시글 조회
    List<RecruitPost> findByAuthor(User author);

    // 카테고리(용병, 팀원, 매치)로 게시글 조회 (페이징 포함)
    Page<RecruitPost> findByCategory(RecruitCategory category, Pageable pageable);

    // 지역으로 게시글 조회 (페이징 포함)
    Page<RecruitPost> findByRegion(String region, Pageable pageable);

    // 세부 지역으로 게시글 조회 (페이징 포함)
    Page<RecruitPost> findBySubRegion(String subRegion, Pageable pageable);

    // 상태(모집중, 모집완료 등)로 게시글 조회 (페이징 포함)
    Page<RecruitPost> findByStatus(RecruitStatus status, Pageable pageable);

    // 날짜로 게시글 조회 (페이징 포함)
    Page<RecruitPost> findByGameDate(LocalDate gameDate, Pageable pageable);

    // 제목 또는 내용에 키워드가 포함된 게시글 조회 (검색 기능)
    // Containing은 LIKE '%keyword%' 쿼리를 생성
    Page<RecruitPost> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword, Pageable pageable);

    // 복합 조건 필터링 예시 (여러 조건 조합)
    // @Query 어노테이션을 사용하거나, Spring Data JPA의 Specification/Querydsl을 사용하는 것이 더 유연하지만,
    // 간단한 조합은 메서드 이름으로도 가능합니다.
    // 추후 필요시 Specification으로 바꿀 예정
    Page<RecruitPost> findByCategoryAndRegionAndStatus(RecruitCategory category, String region, RecruitStatus status, Pageable pageable);

    // 작성자 ID로 게시글 존재 여부 확인 (Optional)
    Optional<RecruitPost> findByAuthorId(Long authorId);
}