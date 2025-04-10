package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * 사용자 정보를 저장하는 엔티티 클래스.
 * - username은 고유하며, 회원가입 시 중복 검사를 위해 사용.
 * - password는 암호화된 비밀번호가 저장됨.
 * - role은 권한 정보를 담음 (예: ROLE_USER, ROLE_ADMIN 등).
 */
@Entity
@Table(name = "users") // MySQL 예약어 회피 및 테이블 이름 명시
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;
}
