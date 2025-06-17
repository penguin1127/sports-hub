package com.example.backend.dto.application;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter  
@Builder
public class ApplicationRequestDto {
    //신청자 id는 @AuthenticationPrincipal 쓸거임.
    //private Long recruitPostId;      // 신청 대상 모집글 ID -> 이걸로 용병 신청인지 팀 신청인지 경기 신청인지도 구분 가능함.
    private String message;          // 신청 메시지 (선택)
    private Long applicantTeamId;    // 팀으로 신청하는 경우 팀 ID (없으면 null)
}