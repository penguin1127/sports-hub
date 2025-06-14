package com.example.backend.controller;

import com.example.backend.dto.auth.ApplicationRequestDTO;
import com.example.backend.dto.auth.ApplicationResponseDTO;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

// 용병, 팀, 경기 신청을 처리하는 컨트롤러
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recruit-posts") // 경로는 나중에 수정할거임
@CrossOrigin("http://localhost:5173") // 출처를 명시적으로 사용
public class RecruitApplyController {
    private final ApplicationService recruitApplyService;

    // 신청하고 싶은 사용자가 신청을 보낼 때(이름, 설명, 신청시간을 팀장한테 보냄(recruit_Application 테이블에 저장함. ))
    // 서버에서 클라이언트한테 데이터를 보내게 하기 위해 ResposeEnity<ApplicationResponseDTO>를 반환 값으로 함.
    @PostMapping("/application/")
    public ResponseEntity<ApplicationResponseDTO> apply(@RequestBody ApplicationRequestDTO requestDTO, @AuthenticationPrincipal
    CustomUserDetails customUserDetails){ // 이름, 설명이 들어있음, dto 클래스 자동 초기화, user_id 같은 경우에는 @AuthenticationPrincipal를 사용
        // 프론트에서 보낸 값은 이미 서버에서 처리함.
        ApplicationResponseDTO responseDTO = recruitApplyService.apply(requestDTO, customUserDetails.getUser());
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

}
