// src/main/java/com/example/backend/dto/user/UserResponseDto.java
package com.example.backend.dto.user;

import com.example.backend.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 사용자 정보 응답 DTO
 * (비밀번호 등 민감 정보는 포함하지 않음)
 */
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private Long id;
    private String name;
    private String email;
    private String userid;
    private String role;
    private Boolean isExPlayer;
    private String region;
    private String preferredPosition;
    private String phoneNumber;
    private LocalDate activityStartDate;
    private LocalDate activityEndDate;
    private LocalDate birthDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 엔티티를 DTO로 변환하는 정적 팩토리 메서드
    public static UserResponseDto fromEntity(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .userid(user.getUserid())
                .role(user.getRole())
                .isExPlayer(user.getIsExPlayer())
                .region(user.getRegion())
                .preferredPosition(user.getPreferredPosition())
                .phoneNumber(user.getPhoneNumber())
                .activityStartDate(user.getActivityStartDate())
                .activityEndDate(user.getActivityEndDate())
                .birthDate(user.getBirthDate())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}