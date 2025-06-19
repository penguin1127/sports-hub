// src/main/java/com/example/backend/controller/ApplicationController.java

package com.example.backend.controller;

import com.example.backend.dto.application.ApplicationRequestDto;
import com.example.backend.dto.application.ApplicationResponseDto;
import com.example.backend.dto.application.ReceivedApplicationResponseDto;
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
@RequestMapping("/api/applications") // ▼▼▼ 이 부분을 수정했습니다. ▼▼▼
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    // 내 신청 내역 목록 조회
    @GetMapping("/my") // 'applications'가 기본 경로이므로 '/my'만 남깁니다.
    public ResponseEntity<List<ApplicationResponseDto>> getMyApplications(@AuthenticationPrincipal UserDetails userDetails) {
        List<ApplicationResponseDto> myApplications = applicationService.getApplicationsForUser(userDetails.getUsername());
        return ResponseEntity.ok(myApplications);
    }

    // 내가 받은 신청 내역 목록 조회
    @GetMapping("/received") // 'applications'가 기본 경로이므로 '/received'만 남깁니다.
    public ResponseEntity<List<ReceivedApplicationResponseDto>> getMyReceivedApplications(@AuthenticationPrincipal UserDetails userDetails) {
        List<ReceivedApplicationResponseDto> receivedApplications = applicationService.getReceivedApplications(userDetails.getUsername());
        return ResponseEntity.ok(receivedApplications);
    }

    // 신청 수락
    @PatchMapping("/{applicationId}/accept")
    public ResponseEntity<String> acceptApplication(@PathVariable Long applicationId, @AuthenticationPrincipal UserDetails userDetails) {
        applicationService.acceptApplication(applicationId, userDetails.getUsername());
        return ResponseEntity.ok("신청이 수락되었습니다.");
    }

    // 신청 거절
    @PatchMapping("/{applicationId}/reject")
    public ResponseEntity<String> rejectApplication(@PathVariable Long applicationId, @RequestBody(required = false) Map<String, String> payload, @AuthenticationPrincipal UserDetails userDetails) {
        String reason = (payload != null) ? payload.getOrDefault("reason", "작성자에 의해 신청이 거절되었습니다.") : "작성자에 의해 신청이 거절되었습니다.";
        applicationService.rejectApplication(applicationId, userDetails.getUsername(), reason);
        return ResponseEntity.ok("신청이 거절되었습니다.");
    }

    // 신청 취소
    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> cancelApplication(@PathVariable Long applicationId, @AuthenticationPrincipal UserDetails userDetails) {
        applicationService.cancelApplication(applicationId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    //내가 받은 신청 내역 목록 조회
    @GetMapping("/received")
    public ResponseEntity<List<ReceivedApplicationResponseDto>> getMyReceivedApplications(@AuthenticationPrincipal UserDetails userDetails) {
        List<ReceivedApplicationResponseDto> receivedApplications = applicationService.getReceivedApplications(userDetails.getUsername());
        return ResponseEntity.ok(receivedApplications);
    }
}