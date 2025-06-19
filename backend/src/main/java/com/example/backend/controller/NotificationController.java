package com.example.backend.controller;

import com.example.backend.dto.notification.NotificationDto;
import com.example.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationDto>> getMyNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        List<NotificationDto> notifications = notificationService.getMyNotifications(userDetails.getUsername());
        return ResponseEntity.ok(notifications);
    }

    // TODO: 알림 읽음 처리 API 등 추가 가능
}