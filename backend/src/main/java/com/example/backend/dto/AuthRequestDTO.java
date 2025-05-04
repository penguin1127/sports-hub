package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequestDTO {
    private String username; // 사용자 ID (userid)
    private String password;
    private String email;    // 회원가입에 필요
}
