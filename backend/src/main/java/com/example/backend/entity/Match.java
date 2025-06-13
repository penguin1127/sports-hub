package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

// 경기를 담당하는 테이블
@Entity
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team teamID;

    @Column(name = "match_time")
    private LocalDateTime matchTime;

    @Column(length = 255, nullable = false)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

}
