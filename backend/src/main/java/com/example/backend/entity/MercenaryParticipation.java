package com.example.backend.entity;

//용병 참여 테이블
//만든 이유: 경기에 1회용으로 참여하는거기 때문에 팀에 참여했다기 보다는 경기에 참여했다고 봐야함. 또한 그 경기에 어느 팀으로 참가했는지 구분해야 함.
//팀장이 용병 신청을 수락하면 업데이트 됨.
//특정 경기의 용병을 다루는 테이블이기 때문에 굳이 용병을 건들 필요가 없음.

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Table(name = "mercenary_participation")
@Entity
public class MercenaryParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match matchID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userID; // 용병 ID, 일반 팀원 ID

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team teamID; // 용병이 어느 팀에 소속되어 있는지 확인하기 위해서


    /*
    @Column(name = "is_mercenary")
    private Boolean isMercenary = true; //(이건 확장할 경우가 있을 때 넣을거임) 용병인지 아닌지 여부, 기본 값을 true로 해놓은 이유: 용병 전용 참여 기록을 다루기 때문임.
    */

    @CreationTimestamp
    @Column(name = "approved_at", nullable = false)
    private LocalDateTime approvedAt; //승인 시간
}
