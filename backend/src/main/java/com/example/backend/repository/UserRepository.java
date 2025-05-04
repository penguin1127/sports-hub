package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // userid로 사용자 존재 여부 확인
    boolean existsByUserid(String userid);

    // userid로 사용자 정보 조회
    Optional<User> findByUserid(String userid);
}
