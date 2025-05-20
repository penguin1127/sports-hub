package com.example.backend.dto;

import com.example.backend.entity.RecruitApplication;
import com.example.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

// 모집 공고를 본 사람이 팀장한테 신청을 보낼 경우.
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecruitApplyDTO {
    //private User userId; // 팀장한테는 이름만 보여주면 되기 때문, userId는 프론트에서 받아오기 x
    private String description; // 자기 소개 글

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Date applicationDate; // 신청 날짜

    public RecruitApplication ToEntity(){ // 엔티티에 dto에 있는 변수 값들을 매핑시키는 함수
        Long id = null;
        return new RecruitApplication(userId, description, applicationDate);
    }
}
