package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

// ENUM 클래스 import (GenderRestriction 제외)
import com.example.backend.enums.RecruitCategory;
import com.example.backend.enums.RecruitTargetType;
import com.example.backend.enums.ParticipantType;
import com.example.backend.enums.RecruitStatus;
// import com.example.backend.enums.GenderRestriction; // 이 부분 삭제

/**
 * 모집 게시글(RecruitPost) 엔티티 - 용병, 팀원, 매치 모집 게시글 정보 관리
 */
@Entity
@Table(name = "recruit_posts")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"author"})
@EqualsAndHashCode(exclude = {"author"})
public class RecruitPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", referencedColumnName = "id", nullable = false)
    private User author;

    @Column(length = 255, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    // --- 지역 관련 필드 ---
    @Column(length = 100, nullable = false)
    private String region; // 시/도 단위의 큰 지역 (예: '서울', '부산')

    @Column(name = "sub_region", length = 100) // 시/군/구 단위의 작은 지역 (예: '강남구', '해운대구')
    private String subRegion;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    // --- ENUM 값 필드 ---
    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private RecruitCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", length = 50, nullable = false)
    private RecruitTargetType targetType;

    @Enumerated(EnumType.STRING)
    @Column(name = "from_participant", length = 50, nullable = false)
    private ParticipantType fromParticipant;

    @Enumerated(EnumType.STRING)
    @Column(name = "to_participant", length = 50, nullable = false)
    private ParticipantType toParticipant;

    // --- 경기/모집 시간 정보 ---
    @Column(name = "game_date", nullable = false)
    private LocalDate gameDate;

    @Column(name = "game_time", nullable = false)
    private LocalTime gameTime;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private RecruitStatus status;

    // --- 상세 모집 조건 필드 (gender_restriction 필드 제거) ---
    @Column(name = "required_personnel")
    private Integer requiredPersonnel;

    // @Enumerated(EnumType.STRING) // 성별 제한 필드 제거
    // @Column(name = "gender_restriction", length = 20)
    // private GenderRestriction genderRestriction; // 이 필드 삭제

    @Column(name = "age_group", length = 50)
    private String ageGroup;

    @Column(name = "preferred_positions", length = 255)
    private String preferredPositions;

    @Column(name = "match_rules", columnDefinition = "TEXT")
    private String matchRules;

    @Column(name = "min_players")
    private Integer minPlayers;

    @Column(name = "max_players")
    private Integer maxPlayers;

    // --- 감사 필드 ---
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // @OneToMany(mappedBy = "recruitPost", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Application> applications = new ArrayList<>();
}