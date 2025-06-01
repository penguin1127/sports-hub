package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime; // LocalDateTime import 추가
import org.hibernate.annotations.CreationTimestamp; // Auditing을 위한 import
import org.hibernate.annotations.UpdateTimestamp;   // Auditing을 위한 import


/**
 * 사용자(User) 엔티티 - 기본 회원 정보와 활동 정보 포함
 */
@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString // exclude = {"joinedTeams"} 제거
@EqualsAndHashCode // exclude = {"joinedTeams"} 제거
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 100, unique = true, nullable = false)
    private String email;

    @Column(length = 50, unique = true, nullable = false)
    private String userid;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(length = 50) // DEFAULT 'USER'는 DB 스키마에서 설정
    private String role;

    // --- 변경 및 삭제된 필드 ---
    // @Lob // joinedTeams 필드 제거
    // @Column(name = "joined_teams", columnDefinition = "TEXT")
    // private String joinedTeams;

    @Column(name = "is_ex_player") // 컬럼명 명시적으로 지정
    private Boolean isExPlayer; // 타입 변경: String -> Boolean

    @Column(length = 100)
    private String region;

    @Column(name = "preferred_position", length = 50)
    private String preferredPosition;

    // isCaptain 필드 제거
    // @Column(name = "is_captain")
    // private Boolean isCaptain;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "activity_start_date")
    private LocalDate activityStartDate;

    @Column(name = "activity_end_date")
    private LocalDate activityEndDate;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    // --- 새로 추가된 필드 ---
    @CreationTimestamp // 엔티티가 처음 저장될 때 자동으로 날짜/시간 기록
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp // 엔티티가 업데이트될 때마다 자동으로 날짜/시간 기록
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Lombok의 @ToString과 @EqualsAndHashCode에서 joinedTeams 필드 제외 (이미 제거했으므로 주석 해제)
    // 현재는 List<UserTeam> 관계로 대체될 것이므로, 해당 필드를 포함하면 순환 참조 문제 발생 가능성 있음.
    // 하지만 지금은 연관관계 매핑을 추가하지 않고 필드만 수정하는 단계이므로, 일단 그대로 둡니다.

    // 추후 Team과의 연관관계 매핑 (User_Team 엔티티가 생성된 후 추가될 부분)
    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<UserTeam> userTeams = new ArrayList<>();
}