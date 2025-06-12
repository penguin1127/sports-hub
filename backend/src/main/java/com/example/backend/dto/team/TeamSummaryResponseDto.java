package com.example.backend.dto.team;

import com.example.backend.entity.Team;
import com.example.backend.entity.UserTeam;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TeamSummaryResponseDto {
    private Long id;
    private String name;
    private String logoUrl;
    private String region;
    private String roleInTeam; // 내가 이 팀에서 맡은 역할

    @Builder
    public TeamSummaryResponseDto(Long id, String name, String logoUrl, String region, String roleInTeam) {
        this.id = id;
        this.name = name;
        this.logoUrl = logoUrl;
        this.region = region;
        this.roleInTeam = roleInTeam;
    }

    // UserTeam 엔티티를 DTO로 변환하는 정적 메소드
    public static TeamSummaryResponseDto fromEntity(UserTeam userTeam) {
        Team team = userTeam.getTeam();
        return TeamSummaryResponseDto.builder()
                .id(team.getId())
                .name(team.getName())
                .logoUrl(team.getLogoUrl())
                .region(team.getRegion())
                .roleInTeam(userTeam.getRoleInTeam()) // UserTeam에서 역할 정보를 가져옴
                .build();
    }
}