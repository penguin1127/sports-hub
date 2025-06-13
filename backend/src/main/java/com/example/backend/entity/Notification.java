package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


// 요약용 알림 테이블

// 개인에게 보내는 알림을 담당하는 테이블(기본 적인 알림들을 처리하는 테이블)

@Table(name = "notification")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "reciver_id", nullable = false)
    private User receiverId; // 알림을 받는 사용자의 ID

    @OneToOne
    @JoinColumn(name = "notificationDetail", nullable = false)
    private NotificationDetail detail;
  
    @Column
    private String type; // 알림 종류

    @Column
    private String message; // 개인 알림 메시지

    @Column(name = "is_read")
    private boolean isRead; // 읽음 여부

    @Column(name = "created_at")
    private LocalDateTime createdAt; // 알림 도착 시간
}
