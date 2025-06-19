package com.example.backend.controller;

import com.example.backend.dto.application.ApplicationResponseDto;
import com.example.backend.dto.application.ReceivedApplicationResponseDto;
import com.example.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    // 내 신청 내역 목록 조회
    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponseDto>> getMyApplications(@AuthenticationPrincipal UserDetails userDetails) {
        List<ApplicationResponseDto> myApplications = applicationService.getApplicationsForUser(userDetails.getUsername());
        return ResponseEntity.ok(myApplications);
    }

    // 내가 받은 신청 내역 목록 조회
    @GetMapping("/received")
    public ResponseEntity<List<ReceivedApplicationResponseDto>> getMyReceivedApplications(@AuthenticationPrincipal UserDetails userDetails) {
        List<ReceivedApplicationResponseDto> receivedApplications = applicationService.getReceivedApplications(userDetails.getUsername());
        return ResponseEntity.ok(receivedApplications);
    }

    // 신청 수락
    @PostMapping("/{applicationId}/accept")
    public ResponseEntity<Void> acceptApplication(@PathVariable Long applicationId, @AuthenticationPrincipal UserDetails userDetails) {
        applicationService.acceptApplication(applicationId, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    // 신청 거절
    @PostMapping("/{applicationId}/reject")
    public ResponseEntity<Void> rejectApplication(@PathVariable Long applicationId, @RequestBody(required = false) Map<String, String> payload, @AuthenticationPrincipal UserDetails userDetails) {
        String reason = (payload != null) ? payload.getOrDefault("reason", "작성자에 의해 신청이 거절되었습니다.") : "작성자에 의해 신청이 거절되었습니다.";
        applicationService.rejectApplication(applicationId, userDetails.getUsername(), reason);
        return ResponseEntity.ok().build();
    }

    // 신청 취소
    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> cancelApplication(@PathVariable Long applicationId, @AuthenticationPrincipal UserDetails userDetails) {
        applicationService.cancelApplication(applicationId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}