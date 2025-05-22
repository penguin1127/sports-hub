package com.example.backend.controller;

import com.example.backend.dto.RecruitApplyDTO;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.RecruitApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 용병 신청을 처리하는 컨트롤러
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team")
public class RecruitApplyController {
    private final RecruitApplyService recruitApplyService;

    // 신청하고 싶은 사용자가 신청을 보낼 때(이름, 설명, 신청시간을 팀장한테 보냄(recruit_Application 테이블에 저장함. ))
    @PostMapping("/apply")
    public String apply(@RequestBody RecruitApplyDTO dto, @AuthenticationPrincipal
    CustomUserDetails customUserDetails){ // 이름, 설명이 들어있음, dto 클래스 자동 초기화, user_id 같은 경우에는 @AuthenticationPrincipal를 사용

        // 사용자의 이름 등을 팀장한테 보내야 함.
        // 현재 로그인한 사용자 정보 주입(로그인은 시큐리티에 저장되어 있는걸로)
        dto.setUserId(customUserDetails.getUser().getId()); //RecruitApplyDTO.userId를 int로 하면 안되고 Long으로 해야함
        dto.setUsername(customUserDetails.getUsername());
        //.findByUsername(userDetails.getUsername())
        recruitApplyService.apply(dto);
        return "신청 완료! 승인이 되면 알려드립니다.";
    }
    // 팀장이 수락했을 시
    /*
    @PostMapping("/apply") //ResponseEntity<String> -> String 형태로 변환 시킴, recruit -> 클라이언트에서 호출하는 메서드
    public ResponseEntity<RecruitApplyDTO> applyToRecruit(@RequestBody RecruitApplyDTO dto){ // 클라이언트 경로에서 보낸 값을 매게변수로 받음. 또는 여기 있는 것 처럼 json 데이터를 자바객체로 변환하여 받음.
        recruitApplyService.apply(dto); // 서비스에 매게변수를 보냄.
        return ResponseEntity.ok("신청 완료!"); // 팀장한테 잘 전달이 되었다는 메시지임.
    }*/

}
