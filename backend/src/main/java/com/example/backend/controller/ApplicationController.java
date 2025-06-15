package com.example.backend.controller;

import com.example.backend.dto.application.ApplicationRequestDto;
import com.example.backend.dto.application.ApplicationResponseDto;
import com.example.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    // 게시글에 지원 신청
    @PostMapping("/recruit-posts/{postId}/apply")
    public ResponseEntity<String> applyToPost(@PathVariable Long postId, @RequestBody ApplicationRequestDto requestDto, @AuthenticationPrincipal UserDetails userDetails) {
        applicationService.createApplication(postId, requestDto, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body("신청이 성공적으로 완료되었습니다.");
    }

    // 내 신청 내역 목록 조회
    @GetMapping("/applications/my")
    public ResponseEntity<List<ApplicationResponseDto>> getMyApplications(@AuthenticationPrincipal UserDetails userDetails) {
        List<ApplicationResponseDto> myApplications = applicationService.getApplicationsForUser(userDetails.getUsername());
        return ResponseEntity.ok(myApplications);
    }

    // 신청 수락
    @PatchMapping("/applications/{applicationId}/accept")
    public ResponseEntity<String> acceptApplication(@PathVariable Long applicationId, @AuthenticationPrincipal UserDetails userDetails) {
        applicationService.acceptApplication(applicationId, userDetails.getUsername());
        return ResponseEntity.ok("신청이 수락되었습니다.");
    }

    // 신청 거절
    @PatchMapping("/applications/{applicationId}/reject")
    public ResponseEntity<String> rejectApplication(@PathVariable Long applicationId, @RequestBody(required = false) Map<String, String> payload, @AuthenticationPrincipal UserDetails userDetails) {
        String reason = (payload != null) ? payload.getOrDefault("reason", "작성자에 의해 신청이 거절되었습니다.") : "작성자에 의해 신청이 거절되었습니다.";
        applicationService.rejectApplication(applicationId, userDetails.getUsername(), reason);
        return ResponseEntity.ok("신청이 거절되었습니다.");
    }

    // 신청 취소
    @DeleteMapping("/applications/{applicationId}")
    public ResponseEntity<Void> cancelApplication(@PathVariable Long applicationId, @AuthenticationPrincipal UserDetails userDetails) {
        applicationService.cancelApplication(applicationId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}