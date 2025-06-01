// src/main/java/com/example/backend/dto/team/TeamUpdateRequestDto.java
package com.example.backend.dto.team;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

/**
 * 팀 정보 수정 요청 DTO
 * (null 허용 필드는 @NotBlank 등 필수 제약 조건을 제거)
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamUpdateRequestDto {

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
}