// src/main/java/com/example/backend/repository/UserTeamRepository.java
package com.example.backend.repository;

import com.example.backend.entity.Team;
import com.example.backend.entity.User;
import com.example.backend.entity.UserTeam;
import com.example.backend.entity.UserTeamId; // UserTeamId import 추가
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, UserTeamId> {
    // 특정 팀에 속한 모든 UserTeam 관계를 삭제하는 메서드 (Team 엔티티를 받아서 처리)
    // Spring Data JPA는 Team 엔티티를 기준으로 연관된 UserTeam 레코드를 찾아 삭제하는 메서드를 자동으로 생성할 수 있습니다.
    void deleteByTeam(Team team); // ✅ 추가

    // 필요하다면 특정 유저의 UserTeam 관계를 찾는 메서드
    List<UserTeam> findByUser(User user);
    List<UserTeam> findByTeam(Team team); // ✅ 반환 타입 List<UserTeam>으로 명시
    List<UserTeam> findByUserId(Long userId);
}