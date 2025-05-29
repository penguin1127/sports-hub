package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 모집 글 DTO
@Getter
@AllArgsConstructor
public class RecruitPostDTO { //
    private String title;
    private String content;
    private String region;
    private String imageUrl;
}
