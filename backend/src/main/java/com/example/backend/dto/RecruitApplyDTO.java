package com.example.backend.dto;

import com.example.backend.entity.RecruitApplication;
import com.example.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

// 모집 공고를 본 사람이 팀장한테 신청을 보낼 경우.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecruitApplyDTO {
    private Long userId; // 팀장한테는 이름만 보여주면 되기 때문, userId는 프론트에서 받아오기 x
    private String description; // 자기 소개 글
    private String username;
    //@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime applicationDate; // 신청 날짜
    private Long postID; // 각각의 포스트를 식별하기 위해서 받아와야 함.

    // Entity 생성을 service에서 담당하고 있기 때문에 ToEntity()는 쓸 필요가 없음.
    /*
    public RecruitApplication ToEntity(){ // 엔티티에 dto에 있는 변수 값들을 매핑시키는 함수
        Long id = null;
        return new RecruitApplication(userId, description, applicationDate);
    } */
}
