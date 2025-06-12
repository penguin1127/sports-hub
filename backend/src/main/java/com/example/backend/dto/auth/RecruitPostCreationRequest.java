// src/main/java/com/example/backend/dto/RecruitPostCreationRequest.java

package com.example.backend.dto.auth; // 이 패키지 선언이 정확해야 합니다.

import com.example.backend.enums.ParticipantType;
import com.example.backend.enums.RecruitCategory;
import com.example.backend.enums.RecruitStatus;
import com.example.backend.enums.RecruitTargetType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class RecruitPostCreationRequest {
    //private Long authorId; // 작성자 ID 추가 //보안문제로 인해 삭제
    private String title;
    private String content;
    private RecruitCategory category; // Enum 타입 확인
    private String region;
    private String subRegion;
    private LocalDate gameDate;
    private LocalTime gameTime;
    private String matchRules;
    private Integer minPlayers; // int 대신 Integer (null 가능성)
    private Integer maxPlayers; // int 대신 Integer
    private String ageGroup;
    private String preferredPositions;
    private String thumbnailUrl;
    private Integer requiredPersonnel;
    private RecruitTargetType targetType; // Enum 타입 확인
    private ParticipantType fromParticipant; // Enum 타입 확인
    private ParticipantType toParticipant;   // Enum 타입 확인
    private RecruitStatus status; // Enum 타입 확인

    // Getters and Setters (Lombok @Getter, @Setter로 대체 가능)
    // lombok이 없다면 직접 추가
}