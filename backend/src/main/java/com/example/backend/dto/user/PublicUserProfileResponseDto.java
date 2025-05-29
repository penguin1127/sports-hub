// src/main/java/com/example/backend/dto/user/PublicUserProfileResponseDto.java
package com.example.backend.dto.user;

import com.example.backend.entity.User; // User 엔티티 임포트
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

// 다른 사용자에게 공개해도 괜찮은 필드들만 포함
@Getter
@Setter
@Builder
public class PublicUserProfileResponseDto {
    private Long id;
    private String name;
    private String userid; // 또는 닉네임 등 공개할 식별자
    private String region;
    private String preferredPosition;
    private Boolean isExPlayer;
    // private String introduction; // User 엔티티에 소개 필드가 있다면 추가 가능
    // private Integer mannerScore; // 예시: 매너 점수 필드가 있다면 추가 가능

    public static PublicUserProfileResponseDto fromEntity(User user) {
        return PublicUserProfileResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .userid(user.getUserid()) // User 엔티티의 userid 사용
                .region(user.getRegion())
                .preferredPosition(user.getPreferredPosition())
                .isExPlayer(user.getIsExPlayer())
                // .introduction(user.getIntroduction())
                // .mannerScore(user.getMannerScore())
                .build();
    }
}