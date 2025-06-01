package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_teams") // 테이블명은 복수형 권장
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"user", "team"}) // 순환 참조 방지
@EqualsAndHashCode(exclude = {"user", "team"}) // 순환 참조 방지
public class UserTeam {

    @EmbeddedId
    private UserTeamId id; // 복합키 (userId, teamId)

    @MapsId("userId") // UserTeamId의 userId 필드와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @MapsId("teamId") // UserTeamId의 teamId 필드와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    private Team team;

    @Column(name = "role_in_team", length = 50, nullable = false)
    private String roleInTeam; // 예: "LEADER", "MEMBER", "MANAGER" 등 (TeamService에서 "LEADER" 사용)

    @Column(name = "is_active", nullable = false)
    @Builder.Default // Builder 사용 시 기본값 설정
    private Boolean isActive = true;

    @Column(name = "joined_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime joinedAt = LocalDateTime.now();

}