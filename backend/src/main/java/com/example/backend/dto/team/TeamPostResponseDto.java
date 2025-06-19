// src/main/java/com/example/backend/dto/team/TeamPostResponseDto.java
package com.example.backend.dto.team;

import com.example.backend.entity.TeamPost;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class TeamPostResponseDto {
    private Long id;
    private String title;
    private String content;
    private Long authorId;
    private String authorName;
    private LocalDateTime createdAt;
    private int likeCount; // 총 좋아요 수
    private boolean isLikedByCurrentUser; // 현재 유저의 좋아요 여부

    public static TeamPostResponseDto fromEntity(TeamPost entity) {
        return TeamPostResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .authorId(entity.getAuthor().getId())
                .authorName(entity.getAuthor().getName()) // User 엔티티에 getName()이 있다고 가정
                .createdAt(entity.getCreatedAt())
                .build();
    }
}