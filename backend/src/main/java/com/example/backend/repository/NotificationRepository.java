package com.example.backend.repository;

import com.example.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // 특정 사용자의 모든 알림을 최신순으로 조회
    List<Notification> findByRecipientIdOrderByCreatedAtDesc(Long recipientId);
}