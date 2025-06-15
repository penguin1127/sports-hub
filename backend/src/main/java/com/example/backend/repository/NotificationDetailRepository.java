package com.example.backend.repository;

import com.example.backend.entity.NotificationDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationDetailRepository extends JpaRepository<NotificationDetail, Long> {
}
