// com/example/backend/dto/team/TeamAnnouncementResponseDto.java
package com.example.backend.dto.team;

import com.example.backend.entity.TeamAnnouncement;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class TeamAnnouncementResponseDto {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;

    public static TeamAnnouncementResponseDto fromEntity(TeamAnnouncement entity) {
        return TeamAnnouncementResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}