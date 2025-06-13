package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.repository.NotificationDetailRepository;
import com.example.backend.repository.NotificationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
// 알림을 통합처리하는 서비스
@AllArgsConstructor
@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationDetailRepository notificationDetailRepository;

    public void notifyMercenaryApplication(User teamLeader, RecruitPost post, MercenaryApplication application) {
        String message = application.getUserID().() + "님이 '" + post.getTitle() + "' 모집에 신청했습니다.";

        Notification notification = Notification.builder()
                .receiverId(teamLeader)
                .message(message)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        NotificationDetail detail = NotificationDetail.builder()
                .notificationID(notification)
                .type(NotificationType.MERCENARY_APPLICATION)
                .targetId(application.getId()) // or post.getId()
                .redirectUrl("/recruit-post/" + post.getId() + "/applications")
                .fullContent(application.getDescription())
                .build();

        notification.setDetail(detail);
        notificationRepository.save(notification); // cascade로 detail도 함께 저장됨
    }

}
