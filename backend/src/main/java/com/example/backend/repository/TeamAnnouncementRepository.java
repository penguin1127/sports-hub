// com/example/backend/repository/TeamAnnouncementRepository.java
package com.example.backend.repository;

import com.example.backend.entity.TeamAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeamAnnouncementRepository extends JpaRepository<TeamAnnouncement, Long> {
    // 특정 팀 ID로 모든 공지사항을 찾아 시간 역순으로 정렬
    List<TeamAnnouncement> findByTeamIdOrderByCreatedAtDesc(Long teamId);
}