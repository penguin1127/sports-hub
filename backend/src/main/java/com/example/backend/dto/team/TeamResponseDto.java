// src/main/java/com/example/backend/dto/team/TeamResponseDto.java
package com.example.backend.dto.team;

import com.example.backend.entity.Team;
import com.example.backend.dto.user.UserResponseDto; // 팀 생성자 정보 DTO
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 팀 정보 응답 DTO
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamResponseDto {

    private Long id;
    private String name;
    private String region;
    private String description;
    private UserResponseDto captain; // ✅ 필드명 변경: creatorUser -> captain
    private String logoUrl; // ✅ 추가된 필드
    private String homeGround; // ✅ 추가된 필드
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 엔티티를 DTO로 변환하는 정적 팩토리 메서드
    public static TeamResponseDto fromEntity(Team team) {
        return TeamResponseDto.builder()
                .id(team.getId())
                .name(team.getName())
                .region(team.getRegion())
                .description(team.getDescription())
                .captain(UserResponseDto.fromEntity(team.getCaptain())) // ✅ getCreatorUser() -> getCaptain()
                .logoUrl(team.getLogoUrl()) // ✅ 추가
                .homeGround(team.getHomeGround()) // ✅ 추가
                .createdAt(team.getCreatedAt())
                .updatedAt(team.getUpdatedAt())
                .build();
    }
}