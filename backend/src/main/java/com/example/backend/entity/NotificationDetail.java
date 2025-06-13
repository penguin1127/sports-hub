package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

// 상세용 알림 테이블
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

    @ManyToOne
    @JoinColumn(name = "notification_id", nullable = false)
    private Notification notificationID;

    @Enumerated(EnumType.STRING) // Enum의 순서(숫자 배열)로 저장할지 이름으로 저장할지 결정 -> single: 문자로 저장
    private String type;

    @Column(name = "target_id")
    private Long targetID; // 신청글 또는 모집글 ID

    private String rediretUrl; // 상세보기를 누를 때 이동시킬 경로

    @ManyToOne
    @JoinColumn(name = "post_id")
    private RecruitPost postID; // 연관된 모잡글 ID

    @ManyToOne
    @JoinColumn(name = "post_application_id")
    private RecruitApplication postApplicationID; // 연관된 신청 ID
}
