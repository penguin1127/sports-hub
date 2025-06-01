// src/main/java/com/example/backend/dto/userteam/UserTeamJoinRequestDto.java
package com.example.backend.dto.userteam;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 사용자 팀 가입 요청 DTO
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTeamJoinRequestDto {

    @NotNull(message = "팀 ID는 필수 입력 값입니다.")
    private Long teamId;

    // roleInTeam은 백엔드에서 기본값(MEMBER)을 설정하거나, 팀 리더만 변경 가능하게 처리
    // 따라서 클라이언트에서 직접 받지 않거나, 특정 역할 부여 시에만 포함
    // @Size(max = 50, message = "팀 내 역할은 50자를 초과할 수 없습니다.")
    // private String roleInTeam; // 필요에 따라 추가
}