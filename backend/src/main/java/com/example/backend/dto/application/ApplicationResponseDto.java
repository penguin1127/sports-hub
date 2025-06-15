package com.example.backend.dto.application;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

// 서버에서 클라이언트한테 보낼 때 사용하는 DTO 클래스
@Getter @Builder
public class ApplicationResponseDto {
    private Long applicationId;
    private String recruitTitle;
    private String applicantName;
    private String status;
    private LocalDateTime appliedAt;
}
