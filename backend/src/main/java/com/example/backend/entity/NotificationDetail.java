package com.example.backend.entity;

import com.example.backend.enums.ParticipantType;
import jakarta.persistence.*;
import lombok.*;

// 상세용 알림 테이블
// 특정 알림들을 처리하는 테이블(컬럼이 너무 많아지는 현상을 막기 위해 분리해놓음, 예: 신청대기 테이블에 저장이 정상적으로 된 후, Notification 테이블을 통해 팀장한테 알림이 가는 경우)

@EqualsAndHashCode(exclude = "notification") @ToString(exclude = "notification")
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

    @OneToOne(mappedBy = "detail") // 하나의 notfication 과의 역방향 관계
    private Notification notificationID;

    @Column(name = "target_id")
    private Long targetID; // 신청글 또는 모집글 ID -> 확장을 위해 Long으로 해둠

    @Column
    private String redirectUrl; // 상세보기를 누를 때 이동시킬 경로 -> 알림을 클릭할 때 간편하게 넘어간다면 사용자 편의성이 증가함.

    @Column
    private String fullContent; // 사용자가 신청을 하였을 때의 메시지

}
