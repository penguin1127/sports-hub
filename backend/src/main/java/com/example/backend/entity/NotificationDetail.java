package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(exclude = "notification")
@ToString(exclude = "notification")
@Table(name = "notification_detail")
@Getter @Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
public class NotificationDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ⛔️ 이 부분을 완전히 삭제합니다. ⛔️
    // @OneToOne(mappedBy = "detail")
    // private Notification notificationID;

    @Column(name = "target_id")
    private Long targetID;

    @Column
    private String redirectUrl;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    // ✅ 이 필드만 남겨두면 됩니다. (관계의 주인)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_id")
    private Notification notification;
}