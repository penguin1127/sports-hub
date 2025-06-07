// src/main/java/com/example/backend/repository/UserRepository.java
package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // Optional 임포트

/**
 * User 엔티티를 위한 JPA Repository 인터페이스
 * Spring Data JPA의 JpaRepository를 상속받아 기본 CRUD 및 페이징/정렬 기능 제공
 */
@Repository // Spring Bean으로 등록되도록 @Repository 어노테이션 추가
public interface UserRepository extends JpaRepository<User, Long> {

    // 사용자 정의 쿼리 메서드 (필요에 따라 추가)

    // email로 사용자 조회 (로그인 시 필요)
    Optional<User> findByEmail(String email);

    // userid로 사용자 조회 (로그인 시 필요)
    Optional<User> findByUserid(String userid);

    // email 또는 userid로 사용자 조회 (중복 확인 등)
    Optional<User> findByEmailOrUserid(String email, String userid);

    // email이 존재하는지 확인 (회원가입 시 중복 확인)
    boolean existsByEmail(String email);

    // userid가 존재하는지 확인 (회원가입 시 중복 확인)
    boolean existsByUserid(String userid);
}