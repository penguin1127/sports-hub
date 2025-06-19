package com.example.backend.entity;

import com.example.backend.enums.NotificationType;
import com.example.backend.enums.ParticipantType;
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
    private User receiver; // 알림을 받는 사용자의 ID

    // 하나의 detail 과의 양방향 관계, cascade = CascadeType.ALL 의미: 부모 엔티티를 조작할 때 자식 엔티티도 함께 조작함.(db에 저장, 삭제 등)
    // 부모: Notification, 자식: NotificationDetail

    /*
    @OneToOne(mappedBy = "notificationID", cascade = CascadeType.ALL)
    @JoinColumn(name = "notification_detail_id", nullable = false)
    private NotificationDetail detail;*/

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private NotificationType type; // 알림 종류

    @Enumerated(EnumType.STRING)
    @Column(name = "category", length = 50, nullable = false)
    private ParticipantType category;

    @Column
    private String message; // 개인 알림 메시지

    @Column(name = "is_read")
    private boolean isRead; // 읽음 여부

    @Column(name = "created_at")
    private LocalDateTime createdAt; // 알림 도착 시간
}

