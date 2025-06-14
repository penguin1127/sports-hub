package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.enums.NotificationType;
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

    public void notifyMercenaryApplication(User teamLeader, RecruitPost post, Application application) {
        String message = application.getApplicant().getName() + "님이 '" + post.getTitle() + "' 모집에 신청했습니다.";

        // 요약된 알림
        Notification notification = Notification.builder()
                .receiverId(teamLeader)
                .message(message)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();
        // 상세보기 알림
        NotificationDetail detail = NotificationDetail.builder()
                .notificationID(notification)
                .type(NotificationType.MERCENARY_APPLICATION)
                .targetID(application.getId()) // or post.getId()
                .redirectUrl("/recruit-post/" + post.getId() + "/applications") // 클릭했을 때 이동시킬 경로
                .fullContent(application.getMessage()) // 사용자가 신청을 하였을 때의 메시지
                .build();

        notification.setDetail(detail);
        notificationRepository.save(notification); // cascade로 detail도 함께 저장됨
    }

}
