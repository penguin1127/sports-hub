// src/main/java/com/example/backend/dto/userteam/UserTeamUpdateRequestDto.java
package com.example.backend.dto.userteam;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 사용자 팀 관계 정보 수정 요청 DTO (주로 팀 리더가 멤버 역할/상태 변경 시 사용)
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTeamUpdateRequestDto {

    @Size(max = 50, message = "팀 내 역할은 50자를 초과할 수 없습니다.")
    private String roleInTeam; // "LEADER", "MEMBER" 등

    private Boolean isActive; // 팀 활동 상태 (탈퇴/재가입 시 사용될 수 있음)
}