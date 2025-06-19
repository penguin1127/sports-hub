package com.example.backend.service;

import com.example.backend.dto.notification.NotificationDto;
import com.example.backend.entity.Notification;
import com.example.backend.entity.User;
import com.example.backend.enums.NotificationType;
import com.example.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public void createAndSendNotification(User recipient, NotificationType type, String message, String relatedUrl) {
        Notification notification = Notification.builder()
                .recipient(recipient)
                .type(type)
                .message(message)
                .relatedUrl(relatedUrl)
                .isRead(false)
                .build();
        notificationRepository.save(notification);
        // TODO: 실시간 알림을 위해 WebSocket 또는 SSE 로직을 여기에 추가할 수 있습니다.
    }

    @Transactional(readOnly = true)
    public List<NotificationDto> getMyNotifications(String userLoginId) {
        // 이 서비스는 UserRepository를 주입받아야 합니다.
        // User recipient = userRepository.findByUserid(userLoginId)...
        // List<Notification> notifications = notificationRepository.findByRecipientIdOrderByCreatedAtDesc(recipient.getId());
        // return notifications.stream().map(NotificationDto::fromEntity).collect(Collectors.toList());
        return List.of(); // 임시로 빈 리스트 반환, UserRepository 주입 후 구현
    }
}