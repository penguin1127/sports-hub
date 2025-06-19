// src/main/java/com/example/backend/dto/userteam/UserTeamResponseDto.java
package com.example.backend.dto.userteam;

import com.example.backend.entity.Team;
import com.example.backend.entity.UserTeam;
import com.example.backend.dto.user.UserResponseDto; // 사용자 정보 DTO
import com.example.backend.dto.team.TeamResponseDto; // 팀 정보 DTO
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 사용자-팀 관계 정보 응답 DTO
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTeamResponseDto {

    private Long userId; // 복합키의 User ID
    private Long teamId; // 복합키의 Team ID
    private UserResponseDto user; // 관련 사용자 정보
    private TeamResponseDto team; // 관련 팀 정보
    private LocalDateTime joinedAt;
    private Boolean isActive;
    private String roleInTeam;

    public static UserTeamResponseDto fromEntity(UserTeam userTeam) {
        Team teamEntity = userTeam.getTeam();

        // 1. 중첩된 TeamResponseDto를 먼저 생성합니다.
        //    이때 myRoleInTeam은 이 DTO의 컨텍스트에서는 알 수 없으므로 null로 설정합니다.
        TeamResponseDto teamDto = TeamResponseDto.builder()
                .id(teamEntity.getId())
                .name(teamEntity.getName())
                .region(teamEntity.getRegion())
                .subRegion(teamEntity.getSubRegion())
                .description(teamEntity.getDescription())
                .captainName(teamEntity.getCaptain().getName())
                .logoUrl(teamEntity.getLogoUrl())
                .homeGround(teamEntity.getHomeGround())
                .createdAt(teamEntity.getCreatedAt())
                .updatedAt(teamEntity.getUpdatedAt())
                .myRoleInTeam(null) // 여기서는 역할을 알 수 없으므로 null 처리
                .build();

        // 2. 완성된 teamDto를 사용하여 최종 UserTeamResponseDto를 생성합니다.
        return UserTeamResponseDto.builder()
                .userId(userTeam.getUser().getId())
                .team(teamDto)
                .joinedAt(userTeam.getJoinedAt())
                .isActive(userTeam.getIsActive())
                .roleInTeam(userTeam.getRoleInTeam())
                .build();
    }
}