package com.example.backend.entity;

import com.example.backend.enums.ApplicationStatus;
import com.example.backend.enums.Position;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

//용병 신청 대기 테이블

@Table(name = "mercenary_application")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
public class MercenaryApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private RecruitPost recruitPostID; //신청한 모집 공고 ID

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userID; // 신청자 ID

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private Position position; // 신청한 선수의 포지션

    @Column(columnDefinition = "Text")
    private String message; // 신청할 때 설명

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private ApplicationStatus status;

    @CreationTimestamp
    @Column
    private LocalDateTime applicationTime; // 처음 막 신청이 생성된 시각

    @UpdateTimestamp
    @Column
    private LocalDateTime updateTime; // 수락, 거절 등으로 신청 상태가 변경된 시각



}
