package com.example.backend.dto.application;

import com.example.backend.entity.Application;
import com.example.backend.enums.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReceivedApplicationResponseDto {

    private Long applicationId;
    private ApplicationStatus status;
    private String message;
    private LocalDateTime appliedAt;

    //어떤 게시글에 대한 신청인지
    private Long postId;
    private String postTitle;

    //누가 신청했는지
    private Long applicantId;
    private String applicantName;

    @Builder
    public ReceivedApplicationResponseDto(Long applicationId, ApplicationStatus status,
                                          String message, LocalDateTime appliedAt, Long postId, String postTitle, Long applicantId, String applicantName) {
        this.applicationId = applicationId;
        this.status = status;
        this.message = message;
        this.appliedAt = appliedAt;
        this.postId = postId;
        this.postTitle = postTitle;
        this.applicantId = applicantId;
        this.applicantName = applicantName;

    }

    public static ReceivedApplicationResponseDto fromEntity(Application application) {
        return ReceivedApplicationResponseDto.builder()
                .applicationId(application.getId())
                .status(application.getApplicationStatus())
                .message(application.getMessage())
                .appliedAt(application.getAppliedAt())
                .postId(application.getRecruitPost().getId())
                .postTitle(application.getRecruitPost().getTitle())
                .applicantId(application.getApplicant().getId())
                .applicantName(application.getApplicant().getName())
                .build();
    }
}
