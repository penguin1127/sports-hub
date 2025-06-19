package com.example.backend.dto.application;

import com.example.backend.entity.Application;
import com.example.backend.enums.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

// 백엔드에서 프론트엔드로 보낼 신청 내역 데이터
@Getter
public class ApplicationResponseDto {
    private Long applicationId;
    private ApplicationStatus status;
    private String message;
    private String rejectionReason; // 거절 사유
    private LocalDateTime appliedAt;
    private Long postId;
    private String postTitle;
    // TODO: 신청자 정보, 신청팀 정보 등 필요에 따라 필드 추가 가능

    @Builder
    public ApplicationResponseDto(Long applicationId, ApplicationStatus status, String message, String rejectionReason, LocalDateTime appliedAt, Long postId, String postTitle) {
        this.applicationId = applicationId;
        this.status = status;
        this.message = message;
        this.rejectionReason = rejectionReason;
        this.appliedAt = appliedAt;
        this.postId = postId;
        this.postTitle = postTitle;
    }

    public static ApplicationResponseDto fromEntity(Application application) {
        return ApplicationResponseDto.builder()
                .applicationId(application.getId())
                .status(application.getStatus())
                .message(application.getMessage())
                .rejectionReason(application.getRejectionReason())
                .appliedAt(application.getAppliedAt())
                .postId(application.getRecruitPost().getId())
                .postTitle(application.getRecruitPost().getTitle())
                .build();
    }
}
