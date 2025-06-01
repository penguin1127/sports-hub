// src/main/java/com/example/backend/dto/user/UserProfileUpdateDto.java
package com.example.backend.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDate;

/**
 * 사용자 프로필 정보 수정 요청 DTO
 * (null 허용 필드는 @NotBlank 등 필수 제약 조건을 제거)
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileUpdateDto {

    @Size(max = 50, message = "이름은 50자를 초과할 수 없습니다.")
    private String name;

    @Email(message = "유효한 이메일 형식이 아닙니다.")
    @Size(max = 100, message = "이메일은 100자를 초과할 수 없습니다.")
    private String email;

    @Size(max = 255, message = "비밀번호는 255자를 초과할 수 없습니다.")
    private String password; // 비밀번호는 보통 별도 변경 API를 둠

    private Boolean isExPlayer;
    private String region;
    private String preferredPosition;
    @Size(max = 20, message = "전화번호는 20자를 초과할 수 없습니다.")
    private String phoneNumber;
    private LocalDate activityStartDate;
    private LocalDate activityEndDate;
    private LocalDate birthDate;
}