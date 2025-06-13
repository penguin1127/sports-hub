package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.w3c.dom.Text;
import java.time.LocalDateTime;

// 팀별 공지사항 알림 등에 대한 클래스임.
@Table(name = "Team")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TeamNotice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team teamID;

    @Column
    private String title; // 공지사항 제목

    @Column
    private String content; // 공지사항 설명

    @Column
    private LocalDateTime created_at; // 공지사항 날짜/시각
}
