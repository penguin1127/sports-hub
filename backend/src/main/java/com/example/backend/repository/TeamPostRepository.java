// src/main/java/com/example/backend/repository/TeamPostRepository.java
package com.example.backend.repository;

import com.example.backend.entity.TeamPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeamPostRepository extends JpaRepository<TeamPost, Long> {
    // 나중에 게시글 목록 조회를 위해 미리 만들어 둡니다.
    List<TeamPost> findByTeamIdOrderByCreatedAtDesc(Long teamId);
}