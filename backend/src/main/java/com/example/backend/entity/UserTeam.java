package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * 사용자-팀 관계 엔티티 (다대다 관계 매핑 테이블)
 */
@Entity
@Table(name = "user_teams")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"user", "team"}) // 순환 참조 방지
@EqualsAndHashCode(exclude = {"user", "team"}) // 순환 참조 방지
public class UserTeam {

    @EmbeddedId // 복합 키를 임베디드 클래스로 지정
    private UserTeamId id;

    // --- User 엔티티와의 다대일 연관관계 매핑 ---
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId") // UserTeamId의 userId 필드와 매핑
    @JoinColumn(name = "user_id", nullable = false) // 실제 DB 컬럼명
    private User user;

    // --- Team 엔티티와의 다대일 연관관계 매핑 ---
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("teamId") // UserTeamId의 teamId 필드와 매핑
    @JoinColumn(name = "team_id", nullable = false) // 실제 DB 컬럼명
    private Team team;

    // --- 추가 속성 ---
    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive; // Boolean 타입으로 명시, DB 스키마의 DEFAULT TRUE는 JPA에서 별도 설정 필요 없거나 DB가 알아서 처리

    @Column(name = "role_in_team", length = 50, nullable = false)
    private String roleInTeam; // DB 스키마의 DEFAULT 'MEMBER'는 JPA에서 별도 설정 필요 없거나 DB가 알아서 처리

    // JPA 헬퍼 메서드 (양방향 관계 설정을 위함)
    public void setUser(User user) {
        this.user = user;
        if (this.id == null) {
            this.id = new UserTeamId();
        }
        this.id.setUserId(user.getId()); // 복합 키의 userId 설정
    }

    public void setTeam(Team team) {
        this.team = team;
        if (this.id == null) {
            this.id = new UserTeamId();
        }
        this.id.setTeamId(team.getId()); // 복합 키의 teamId 설정
    }

    // Builder 패턴 사용 시 필드를 직접 설정할 수 있도록 setter를 통해 ID를 설정할 수 있도록 추가 (선택 사항)
    // @Builder 어노테이션 사용 시, AllArgsConstructor를 통해 모든 필드에 대한 빌더를 제공하며,
    // 복합 키 필드(id, user, team)는 Builder에서 직접 설정하기 어렵습니다.
    // 따라서 UserTeam.builder() 사용 시, id(new UserTeamId(...)).user(...).team(...) 와 같이 명시적으로 설정하거나
    // UserTeam 엔티티 내부에 @Builder.Default나 생성자를 통해 초기화 로직을 추가하는 것을 고려해야 합니다.

    // Lombok @Builder를 사용하면서 복합키를 깔끔하게 다루기 위한 예시 (선택사항, 복잡도 증가)
    // @Builder(toBuilder = true) // toBuilder = true를 통해 빌더로 다시 변환 가능하게 함
    // public UserTeam(UserTeamId id, User user, Team team, LocalDateTime joinedAt, Boolean isActive, String roleInTeam) {
    //     this.id = id;
    //     this.user = user;
    //     this.team = team;
    //     this.joinedAt = joinedAt;
    //     this.isActive = isActive;
    //     this.roleInTeam = roleInTeam;
    //     // 양방향 매핑 시 여기서도 리스트에 추가 로직 필요
    //     // if (user != null && !user.getUserTeams().contains(this)) user.getUserTeams().add(this);
    //     // if (team != null && !team.getUserTeams().contains(this)) team.getUserTeams().add(this);
    // }
}