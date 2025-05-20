package com.example.backend.entity;

import com.example.backend.Enum.ApplicationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

// 신청 대기 테이블(신청한 사용자도 수락, 거절, 대기 여부를 볼 수 있다는 장점 존재.)
@Table(name = "recruit_application")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RecruitApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 증가
    private String id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @Column
    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status; // 열거형으로 상태 지정(수락, 거절, 대기 같이 3가지 이상 상태를 지정 가능)

    @Column(name = "application_date")
    private Date applicationDate; // 신청 날짜


    public RecruitApplication(User userId, String description, Date applicationDate){
        this.userId = userId;
        this.description = description;
        this.applicationDate = applicationDate;
    }
}
