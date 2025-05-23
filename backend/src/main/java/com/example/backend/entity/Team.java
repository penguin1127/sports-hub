package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "Team")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Team")
public class Team {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "team_name", length = 100)
    private String teamName;

    @OneToOne
    @JoinColumn(name = "captain_id", unique = true)
    // 외래키 이름, user 테이블의 user.id 즉 기본키를 참조 -> 기본키만 알면 검색가능, 하나의 유저는 여러가지 팀을 가질 수 없음-> unique
    private User captainId; // user 객체 참조

    @Column(name = "create_data")
    private Date createDate;

    @Column(unique = false)
    private String region; // 지역은 여러가지를 가질 수 있음
}
