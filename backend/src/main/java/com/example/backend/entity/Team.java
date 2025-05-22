package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime; // LocalDateTime import 추가
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * 팀(Team) 엔티티 - 축구팀의 정보 관리
 */
@Entity
@Table(name = "teams")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString // @ToString(exclude = {"members"}) 같은 연관관계 필드가 있다면 추가. 현재는 없음.
@EqualsAndHashCode // @EqualsAndHashCode(exclude = {"members"}) 같은 연관관계 필드가 있다면 추가. 현재는 없음.
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    // --- captain_id 필드 연관관계 매핑 ---
    @ManyToOne(fetch = FetchType.LAZY) // 지연 로딩 설정 (성능상 이점)
    @JoinColumn(name = "captain_id", referencedColumnName = "id", nullable = true) // captain_id 컬럼이 users 테이블의 id를 참조
    private User captain; // captain_id 대신 User 객체를 직접 참조

    @Column(length = 100)
    private String region;

    // --- 새로 추가된 필드 ---
    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "home_ground", length = 255)
    private String homeGround;

    // --- 새로 추가된 감사 필드 ---
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // 추후 User_Team과의 연관관계 매핑 (User_Team 엔티티가 생성된 후 추가될 부분)
    // @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<UserTeam> userTeams = new ArrayList<>();
}