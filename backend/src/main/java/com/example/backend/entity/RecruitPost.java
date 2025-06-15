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
    private String title;

    @Lob // 긴 텍스트를 위해
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(length = 100, nullable = false)
    private String region;

    @Column(name = "sub_region", length = 100)
    private String subRegion;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private RecruitCategory category; // 용병 모집인지 팀 모집인지 경기 모집인지를 결정하는 카테고리

    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", length = 50, nullable = false)
    private RecruitTargetType targetType;

    @Enumerated(EnumType.STRING)
    @Column(name = "from_participant", length = 50, nullable = false)
    private ParticipantType fromParticipant;

    @Enumerated(EnumType.STRING)
    @Column(name = "to_participant", length = 50, nullable = false)
    private ParticipantType toParticipant;

    @Column(name = "game_date") // nullable = false 제거 (용병/팀원 모집 시 선택 사항일 수 있음)
    private LocalDate gameDate;

    @Column(name = "game_time") // nullable = false 제거
    private LocalTime gameTime;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private RecruitStatus status;

    @Column(name = "required_personnel")
    private Integer requiredPersonnel;

    @Column(name = "age_group", length = 50)
    private String ageGroup;

    @Column(name = "preferred_positions", length = 255)
    private String preferredPositions;

    @Lob
    @Column(name = "match_rules", columnDefinition = "TEXT")
    private String matchRules;

    @Column(name = "min_players")
    private Integer minPlayers;

    @Column(name = "max_players")
    private Integer maxPlayers;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // 양방향 연관관계: 이 게시글에 대한 Application 목록
    @OneToMany(mappedBy = "recruitPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>();
}