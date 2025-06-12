package com.example.backend.dto.mercenary;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 용병 신청 dto - 아이디는 시큐리티 기능을 사용하고 받을거고, 여기에서 받는건 일단 모집 공고 ID, 설명(자기소개), 포지션(역할)임
@Getter
@NoArgsConstructor
public class UserMercenaryJoinRequestDto {

    //private Long userId;        // 신청자 ID

    @NotNull
    private Long recruitPostId; // 모집 공고 ID

    @Size(max = 300)    // 최대 제한 300자(한글이나 영어나 동일함)
    private String massage;     // 설명

    @NotBlank
    private String position;    // 포지션(역할)
}
