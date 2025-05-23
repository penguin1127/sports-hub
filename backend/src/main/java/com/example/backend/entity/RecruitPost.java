package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

// 모집 공고 테이블(특정 지역인 사람만 신청가능 등 여러가지 제한 조건이 있음.)
@Entity
@Table(name = "recruit_post")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id") // 실제 DB 컬럼명과 일치시킴
    private Long id;

    @ManyToOne // 하나의 팀이 여러개의 공고를 올릴 수도 있음(이력에도 남아야 함.)
    @JoinColumn(name = "team_id")
    private Team teamId; // 팀 id 외래키

    @ManyToOne // 한명의 작성자가 여러개를 작성할 수도 있음(이력에도 남아야 함.)
    @JoinColumn(name = "writer_id")
    private User writerId; // 글을 작성한 유저의 id

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "region")
    private String region;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "match_date")
    private LocalDate matchDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "category") // 예: "mercenary"
    private String category;

    @Column(name = "target_type") // 예: "개인→팀" / "팀→개인"
    private String targetType;
}
