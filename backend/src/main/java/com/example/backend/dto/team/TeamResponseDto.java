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
    private String subRegion;
    private String description;
    private String captainName;
    private String logoUrl;
    private String homeGround;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String myRoleInTeam; // 내가 이 팀에서 맡은 역할

}