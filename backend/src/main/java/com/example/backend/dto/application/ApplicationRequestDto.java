package com.example.backend.dto.application;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationRequestDto {
    private String message;
    private Long applicantTeamId; // 팀 자격으로 신청할 경우 팀의 ID
}