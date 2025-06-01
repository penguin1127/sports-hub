// src/main/java/com/example/backend/dto/user/UserLoginRequestDto.java
package com.example.backend.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

/**
 * 사용자 로그인 요청 DTO
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLoginRequestDto {

    @NotBlank(message = "아이디 또는 이메일은 필수 입력 값입니다.")
    @Size(max = 100, message = "아이디 또는 이메일은 100자를 초과할 수 없습니다.")
    private String loginId; // 아이디 또는 이메일을 받을 필드

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, max = 255, message = "비밀번호는 8자 이상 255자 이하여야 합니다.")
    private String password;
}