// src/main/java/com/example/backend/dto/recruit/RecruitPostResponseDto.java
package com.example.backend.dto.auth;

import com.example.backend.enums.RecruitCategory;
import com.example.backend.enums.RecruitTargetType;
import com.example.backend.enums.ParticipantType;
import com.example.backend.enums.RecruitStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Getter @Setter @Builder // Lombok 어노테이션
public class RecruitPostResponseDto {
    private Long id;
    private String title;
    private String content;
    private String region;
    private String subRegion;
    private String thumbnailUrl;

    // ENUM 필드 (RecruitPost 엔티티의 ENUM 타입과 일치)
    private RecruitCategory category;
    private RecruitTargetType targetType;
    private ParticipantType fromParticipant;
    private ParticipantType toParticipant;
    private RecruitStatus status;

    private LocalDate gameDate;
    private LocalTime gameTime;

    private Integer requiredPersonnel;
    private String ageGroup;
    private String preferredPositions;
    private String matchRules;
    private Integer minPlayers;
    private Integer maxPlayers;

    // 작성자 정보 - User 엔티티 전체 대신 필요한 정보만 포함 (프록시 문제 방지)
    private Long authorId; // 작성자의 ID
    private String authorName; // 작성자의 이름

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}