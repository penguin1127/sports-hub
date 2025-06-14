package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList; // Application 연관관계 위해 추가
import java.util.List;    // Application 연관관계 위해 추가
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.backend.enums.RecruitCategory;
import com.example.backend.enums.RecruitTargetType;
import com.example.backend.enums.ParticipantType;
import com.example.backend.enums.RecruitStatus;

@Entity
@Table(name = "recruit_posts")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"author", "postingTeam", "applications"}) // 양방향 연관관계 필드 제외
@EqualsAndHashCode(exclude = {"author", "postingTeam", "applications"}) // 양방향 연관관계 필드 제외
public class RecruitPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", referencedColumnName = "id", nullable = false)
    private User author; // 게시글을 시스템에 등록한 사용자

    // ✅ 새로운 필드: 이 게시글의 주체가 되는 팀 (팀원/경기 모집 시)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posting_team_id", referencedColumnName = "id", nullable = true)
    private Team postingTeam; // 팀이 주체일 경우 해당 팀, 개인이 주체면 null

    @Column(length = 255, nullable = false)
    private String title; // 게시글 제목

    @Lob // 긴 텍스트를 위해
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; // 게시글 본문  내용

    @Column(length = 100, nullable = false)
    private String region; // 시/도 수준의 지역 정보

    @Column(name = "sub_region", length = 100)
    private String subRegion; // 구/군 수준의 지역 정보

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl; // 썸네일 이미지

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private RecruitCategory category; // 모집 카테고리 -> 팀원 모집, 용병 모집, 경기 모집 등

    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", length = 50, nullable = false)
    private RecruitTargetType targetType; //모집 대상의 형태 -> 팀 개인 등

    @Enumerated(EnumType.STRING)
    @Column(name = "from_participant", length = 50, nullable = false)
    private ParticipantType fromParticipant; // 글을 작성한 주체가 개인인지 팀인지

    @Enumerated(EnumType.STRING)
    @Column(name = "to_participant", length = 50, nullable = false)
    private ParticipantType toParticipant; // 이 모집이 개인을 위한 것인지, 팀을 위한 것인지

    @Column(name = "game_date") // nullable = false 제거 (용병/팀원 모집 시 선택 사항일 수 있음)
    private LocalDate gameDate; // 경기가 예정된 날짜

    @Column(name = "game_time") // nullable = false 제거
    private LocalTime gameTime; // 경기가 예정된 시간

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private RecruitStatus status; // 모집 중, 마감 등 상태 값

    @Column(name = "required_personnel")
    private Integer requiredPersonnel; // 모집 인원 수

    @Column(name = "age_group", length = 50)
    private String ageGroup; // 모집 연령대

    @Column(name = "preferred_positions", length = 255)
    private String preferredPositions; // 원하는 포지션  (FW, DF, MF 등 문자열로 저장)

    @Lob
    @Column(name = "match_rules", columnDefinition = "TEXT")
    private String matchRules; // 경기 규칙 설명

    @Column(name = "min_players")
    private Integer minPlayers; // 최소 인원 제한(경기 개최 기준)

    @Column(name = "max_players")
    private Integer maxPlayers; //최대 인원 제한(과다 인원 방지)

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // 생성 시각(자동 기록)

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt; // 마지막 수정 시각(상태 변화 등, 자동 기록)

    // 양방향 연관관계: 이 게시글에 대한 Application 목록
    @OneToMany(mappedBy = "recruitPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>(); // 이 모집글에 대한 신청서 목록 (1:N 관계)
}