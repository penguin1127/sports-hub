package com.example.backend.dto.team;

import com.example.backend.entity.UserTeam;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Getter
public class TeamMemberResponseDto {
    private Long userId;
    private String userName;
    private String userLoginId;
    private String roleInTeam;
    // TODO: 필요하다면 유저의 포지션, 프로필 이미지 등 추가 정보 포함 가능

    @Builder
    public TeamMemberResponseDto(Long userId, String userName, String userLoginId, String roleInTeam) {
        this.userId = userId;
        this.userName = userName;
        this.userLoginId = userLoginId;
        this.roleInTeam = roleInTeam;
    }

    public static TeamMemberResponseDto fromEntity(UserTeam userTeam) {
        return TeamMemberResponseDto.builder()
                .userId(userTeam.getUser().getId())
                .userName(userTeam.getUser().getName())
                .userLoginId(userTeam.getUser().getUserid())
                .roleInTeam(userTeam.getRoleInTeam())
                .build();
    }
}