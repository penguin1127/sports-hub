package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

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

    @Column(name = "role", length = 50)
    private String role;

    @Lob
    @Column(name = "joined_teams", columnDefinition = "TEXT")
    private String joinedTeams;

    @Column(name = "is_ex_player", length = 50)
    private String isExPlayer;

    @Column(length = 100)
    private String region;

    @Column(name = "preferred_position", length = 50)
    private String preferredPosition;

    @Column(name = "is_captain")
    private Boolean isCaptain;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "activity_start_date")
    private LocalDate activityStartDate;

    @Column(name = "activity_end_date")
    private LocalDate activityEndDate;

    @Column(name = "birth_date")
    private LocalDate birthDate;
}
