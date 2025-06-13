package com.example.backend.dto.auth;

import lombok.Getter;
import lombok.Setter;

/**
 * 로그인/회원가입 요청 시 사용하는 DTO
 */
@Getter
@Setter
public class AuthRequestDTO {
    private String userid;
    private String password;
    private String name;  // 회원가입 시만 사용
}
