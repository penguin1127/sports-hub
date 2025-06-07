// src/main/java/com/example/backend/dto/user/UserSignUpRequestDto.java
package com.example.backend.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * 사용자 회원가입 요청 DTO
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSignUpRequestDto {

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    @Size(max = 50, message = "이름은 50자를 초과할 수 없습니다.")
    private String name;

    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "유효한 이메일 형식이 아닙니다.")
    @Size(max = 100, message = "이메일은 100자를 초과할 수 없습니다.")
    private String email;

    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    @Size(min = 4, max = 50, message = "아이디는 4자 이상 50자 이하여야 합니다.")
    private String userid;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, max = 255, message = "비밀번호는 8자 이상 255자 이하여야 합니다.")
    private String password;

    private Boolean isExPlayer;
    private String region;
    private String preferredPosition;
    private String phoneNumber;
}