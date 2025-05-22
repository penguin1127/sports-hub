// src/main/java/com/example/backend/repository/TeamRepository.java
package com.example.backend.repository;

import com.example.backend.entity.Team;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // List import 추가

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    // 특정 사용자가 주장인 팀들을 조회하는 메서드 추가
    List<Team> findByCaptain(User captain); // ✅ 반환 타입을 List<Team>으로 명확히
}