package com.example.backend.repository;

import com.example.backend.entity.RecruitPost;
import com.example.backend.entity.User; // 작성자 User 엔티티 import
import com.example.backend.enums.RecruitCategory; // ENUM import
import com.example.backend.enums.RecruitStatus;   // ENUM import
import org.springframework.data.domain.Page;         // 페이징 처리 import
import org.springframework.data.domain.Pageable;     // 페이징 처리 import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph; // EntityGraph를 사용하기 위해 임포트
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

    // 모든 게시글 조회 시 작성자(author) 정보를 즉시 로딩합니다.
    @EntityGraph(attributePaths = "author")
    List<RecruitPost> findAll(); // JpaRepository의 findAll()을 오버라이딩

    // 특정 ID로 게시글 조회 시 작성자(author) 정보를 즉시 로딩합니다.
    @EntityGraph(attributePaths = "author")
    Optional<RecruitPost> findById(Long id); // JpaRepository의 findById()를 오버라이딩

    // 작성자로 게시글 조회 시 작성자(author) 정보도 함께 로딩합니다.
    @EntityGraph(attributePaths = "author")
    List<RecruitPost> findByAuthor(User author);

    // 카테고리(용병, 팀원, 매치)로 게시글 조회 (페이징 포함) 시 작성자 정보도 함께 로딩합니다.
    @EntityGraph(attributePaths = "author")
    Page<RecruitPost> findByCategory(RecruitCategory category, Pageable pageable);

    // 지역으로 게시글 조회 (페이징 포함) 시 작성자 정보도 함께 로딩합니다.
    @EntityGraph(attributePaths = "author")
    Page<RecruitPost> findByRegion(String region, Pageable pageable);

    // 세부 지역으로 게시글 조회 (페이징 포함) 시 작성자 정보도 함께 로딩합니다.
    @EntityGraph(attributePaths = "author")
    Page<RecruitPost> findBySubRegion(String subRegion, Pageable pageable);

    // 상태(모집중, 모집완료 등)로 게시글 조회 (페이징 포함) 시 작성자 정보도 함께 로딩합니다.
    @EntityGraph(attributePaths = "author")
    Page<RecruitPost> findByStatus(RecruitStatus status, Pageable pageable);

    // 날짜로 게시글 조회 (페이징 포함) 시 작성자 정보도 함께 로딩합니다.
    @EntityGraph(attributePaths = "author")
    Page<RecruitPost> findByGameDate(LocalDate gameDate, Pageable pageable);

    // 제목 또는 내용에 키워드가 포함된 게시글 조회 (검색 기능) 시 작성자 정보도 함께 로딩합니다.
    @EntityGraph(attributePaths = "author")
    Page<RecruitPost> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword, Pageable pageable);

    // 복합 조건 필터링 예시 (여러 조건 조합) 시 작성자 정보도 함께 로딩합니다.
    @EntityGraph(attributePaths = "author")
    Page<RecruitPost> findByCategoryAndRegionAndStatus(RecruitCategory category, String region, RecruitStatus status, Pageable pageable);

    // 작성자 ID로 게시글 존재 여부 확인 (Optional) - 이 메서드는 단순히 존재 여부만 확인하므로,
    // RecruitPost 객체 전체나 author 필드에 접근할 필요가 없어 @EntityGraph는 필요 없습니다.
    // 만약 Optional<RecruitPost>를 반환하고 그 안의 author 필드에 접근할 예정이라면 @EntityGraph를 추가해야 합니다.
    // 여기서는 ID만으로 존재 여부 확인으로 간주하여 @EntityGraph를 붙이지 않습니다.
    Optional<RecruitPost> findByAuthorId(Long authorId);
    List<RecruitPost> findByAuthorIdOrderByCreatedAtDesc(Long authorId);
}