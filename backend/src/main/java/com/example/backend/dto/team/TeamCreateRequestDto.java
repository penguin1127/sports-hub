// src/main/java/com/example/backend/dto/team/TeamCreateRequestDto.java
package com.example.backend.dto.team;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 팀 생성 요청 DTO
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamCreateRequestDto {

    @NotBlank(message = "팀 이름은 필수 입력 값입니다.")
    @Size(max = 100, message = "팀 이름은 100자를 초과할 수 없습니다.")
    private String name;

    @Size(max = 100, message = "지역은 100자를 초과할 수 없습니다.")
    private String region;

    @Size(max = 255, message = "팀 소개는 255자를 초과할 수 없습니다.")
    private String description;

    @Size(max = 500, message = "로고 URL은 500자를 초과할 수 없습니다.")
    private String logoUrl; // ✅ 추가된 필드

    @Size(max = 255, message = "홈 구장은 255자를 초과할 수 없습니다.")
    private String homeGround; // ✅ 추가된 필드

    // captain은 백엔드에서 인증된 사용자 정보를 통해 자동으로 설정되므로 DTO에 포함하지 않습니다.

    // creatorUser는 백엔드에서 인증된 사용자 정보를 통해 자동으로 설정되므로 DTO에 포함하지 않습니다.
}