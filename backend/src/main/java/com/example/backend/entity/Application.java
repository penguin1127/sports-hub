package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

// ENUM 클래스 import
import com.example.backend.enums.ApplicationStatus;

/**
 * 모집 신청(Application) 엔티티 - 게시글에 대한 개인/팀 신청 정보 관리
 */
@Entity
@Table(name = "applications")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"recruitPost", "applicant", "applicantTeam"}) // 순환 참조 방지
@EqualsAndHashCode(exclude = {"recruitPost", "applicant", "applicantTeam"}) // 순환 참조 방지
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- 모집 게시글(RecruitPost)과의 연관관계 매핑 ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruit_post_id", referencedColumnName = "id", nullable = false)
    private RecruitPost recruitPost;

    // --- 신청자(User)와의 연관관계 매핑 (개인 신청의 주체) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id", referencedColumnName = "id", nullable = false)
    private User applicant; // 신청 행위를 한 사용자 (개인이든 팀장이든)

    // --- 신청 팀(Team)과의 연관관계 매핑 (팀 신청일 경우) ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_team_id", referencedColumnName = "id", nullable = true) // NULL 허용
    private Team applicantTeam; // 팀 자격으로 신청한 경우 해당 팀

    // --- 신청 상태 필드 (enum 타입) ---
    @Enumerated(EnumType.STRING)
    @Column(name = "application_status", length = 50, nullable = false)
    private ApplicationStatus applicationStatus;

    @Column(columnDefinition = "TEXT")
    private String message; // 신청 시 전달할 메시지

    // --- 감사 필드 ---
    @CreationTimestamp
    @Column(name = "applied_at", nullable = false, updatable = false) // 신청 일시
    private LocalDateTime appliedAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false) // 상태 업데이트 일시
    private LocalDateTime updatedAt;

    @Column(name = "rejection_reason")
    private String rejectionReason;

}