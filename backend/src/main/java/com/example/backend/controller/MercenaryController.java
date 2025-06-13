package com.example.backend.controller;

import com.example.backend.dto.mercenary.MercenaryApplicationResponseDTO;
import com.example.backend.dto.mercenary.UserMercenaryJoinRequestDto;
import com.example.backend.service.MercenaryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

// 용병 신청을 받는 컨트롤러

@AllArgsConstructor
@RestController // View에서 직접 받지 않고 Json 파일 등을 통해서 받음.
@RequestMapping("api/mercenary-application")
@CrossOrigin("http://localhost:5173") // 출처를 명시적으로 사용
public class MercenaryController {

    final private MercenaryService mercenaryService;

    @PostMapping("/") // 용병 산청을 받음.
    public ResponseEntity<MercenaryApplicationResponseDTO> apply(@Valid @RequestBody UserMercenaryJoinRequestDto dto // 응답하는 DTO를 통해서 클라이언트에게 응답함
            , @AuthenticationPrincipal UserDetails userDetails){ // 클라이언트에서 보내야하는 정보: recruitPostId, massage, position, userid는 백엔드에서 처리함

        //로그인한 사용자 Id 등록
        String username = userDetails.getUsername(); // 보통 username으로 유저 식별
        MercenaryApplicationResponseDTO response = mercenaryService.apply(dto, username); // 응답하는 dto를 반환값으로 받음.

        return ResponseEntity.status(HttpStatus.CREATED).body(response); // HttpStatus.CREATED: 응답 코드 201(새로운 데이터 생성 성공)
    }
}
