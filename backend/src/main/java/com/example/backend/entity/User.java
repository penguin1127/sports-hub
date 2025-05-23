package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

/**
 * 사용자(User) 엔티티 - 기본 회원 정보와 활동 정보 포함
 */
@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"joinedTeams"})
@EqualsAndHashCode(exclude = {"joinedTeams"})
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

    @Column(length = 50)
    private String role;

    @Lob
    @Column(name = "joined_teams", columnDefinition = "TEXT")
    private String joinedTeams;

    @Column(length = 50)
    private String isExPlayer;

    @Column(length = 100)
    private String region;

    @Column(name = "preferred_position", length = 50)
    private String preferredPosition;

    private Boolean isCaptain;

    @Column(length = 20)
    private String phoneNumber;

    private LocalDate activityStartDate;
    private LocalDate activityEndDate;
    private LocalDate birthDate;
}
