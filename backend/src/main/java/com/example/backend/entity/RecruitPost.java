package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Column(name = "team_id")
    private Long teamId;

    @Column(name = "writer_id")
    private Long writerId;

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
