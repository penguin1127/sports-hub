package com.example.backend.repository;

import com.example.backend.entity.NotificationDetail;
import org.springframework.data.jpa.repository.JpaRepository;

// 용병 신청 등 특수 알람
public interface NotificationDetailRepository extends JpaRepository<NotificationDetail, Long> {

}
