// src/main/java/com/example/backend/dto/userteam/UserTeamResponseDto.java
package com.example.backend.dto.userteam;

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

    // 엔티티를 DTO로 변환하는 정적 팩토리 메서드
    public static UserTeamResponseDto fromEntity(UserTeam userTeam) {
        return UserTeamResponseDto.builder()
                .userId(userTeam.getUser().getId())
                .teamId(userTeam.getTeam().getId())
                .user(UserResponseDto.fromEntity(userTeam.getUser()))
                .team(TeamResponseDto.fromEntity(userTeam.getTeam()))
                .joinedAt(userTeam.getJoinedAt())
                .isActive(userTeam.getIsActive())
                .roleInTeam(userTeam.getRoleInTeam())
                .build();
    }
}