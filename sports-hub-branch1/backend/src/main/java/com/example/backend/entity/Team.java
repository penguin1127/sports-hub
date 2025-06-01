package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "teams") // 테이블명은 복수형 권장
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"captain", "userTeams", "recruitPosts", "applications"}) // 양방향 연관관계 필드 제외
@EqualsAndHashCode(exclude = {"captain", "userTeams", "recruitPosts", "applications"}) // 양방향 연관관계 필드 제외
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false, unique = true) // 팀 이름은 고유한 것이 좋을 수 있음
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "captain_id", referencedColumnName = "id", nullable = false)
    private User captain; // 팀 주장 (User 엔티티와 직접 연결)

    @Column(length = 100)
    private String region;

    @Column(name = "sub_region", length = 100)
    private String subRegion;

    @Lob // 긴 텍스트를 위해 @Lob 어노테이션 사용 가능
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "home_ground", length = 255)
    private String homeGround;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // 양방향 연관관계: 이 팀에 속한 UserTeam 목록
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserTeam> userTeams = new ArrayList<>();

    // 양방향 연관관계: 이 팀이 게시한 RecruitPost 목록
    @OneToMany(mappedBy = "postingTeam", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecruitPost> recruitPosts = new ArrayList<>();

    // 양방향 연관관계: 이 팀이 신청한 Application 목록
    @OneToMany(mappedBy = "applicantTeam", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>();

    // 편의 메소드 (UserTeam 관계 설정 등)
    public void addMember(UserTeam userTeam) {
        userTeams.add(userTeam);
        userTeam.setTeam(this);
    }

    public void removeMember(UserTeam userTeam) {
        userTeams.remove(userTeam);
        userTeam.setTeam(null);
    }
}