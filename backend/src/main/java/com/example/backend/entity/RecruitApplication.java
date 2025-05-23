package com.example.backend.entity;

import com.example.backend.Enum.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

// 신청 대기 테이블(신청한 사용자도 수락, 거절, 대기 여부를 볼 수 있다는 장점 존재.)
//@Table(name = "recruit_application")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class RecruitApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 증가
    private int id;

    @ManyToOne // 유저는 여러군데에 용병 신청서를 낼 수 있음(이걸 상황에 따라 제한하는건 서비스 단계에서 함) -> N:1
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne // 여러개의 동일한 post_id를 사용가능. -> 하나의 모집 글에 여러명 신청 가능, N:1
    @JoinColumn(name = "post_id", nullable = false)
    private RecruitPost post;

    @Column(length = 150) // 자기소개 글자 최대 길이: 150자
    private String description;

    @Column(nullable = false) // Not Null: 제약조건, 널 값이면 안됨, db차원에서 데이터 무결성 보장
    @Enumerated(EnumType.STRING) // 열거형으로 데이터베이스의 문자를 지정하겠다는 의미
    private ApplicationStatus status; // 열거형으로 상태 지정(수락, 거절, 대기 같이 3가지 이상 상태를 지정 가능)

    @Column(name = "application_date")
    private LocalDateTime applicationDate; // 신청 날짜와 시간을 담음.(날짜와 시간을 담기 위해 LocalDateTime 사용)


    /*
    public RecruitApplication(User user, String description, LocalDateTime applicationDate){
        this.user = user;
        this.description = description;
        this.applicationDate = applicationDate;
    }*/
}
