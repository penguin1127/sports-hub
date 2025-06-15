package com.example.backend.service;

import com.example.backend.dto.application.ApplicationRequestDto;
import com.example.backend.entity.*;
import com.example.backend.enums.ApplicationStatus;
import com.example.backend.enums.RecruitStatus;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final RecruitPostRepository recruitPostRepository;
    private final TeamRepository teamRepository; // 팀 신청 시 필요

    private final NotificationService notificationService;
    @Transactional
    public Application createApplication(Long postId, ApplicationRequestDto requestDto, String applicantLoginId) {
        // 1. 필요한 엔티티 조회
        User applicant = userRepository.findByUserid(applicantLoginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        RecruitPost recruitPost = recruitPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("모집글을 찾을 수 없습니다."));

        // 2. 비즈니스 로직 검증
        // 2-1. 본인 글에는 지원 불가
        if (recruitPost.getAuthor().getId().equals(applicant.getId())) {
            throw new AccessDeniedException("본인이 작성한 글에는 신청할 수 없습니다.");
        }
        // 2-2. 모집중인 글에만 지원 가능
        if (recruitPost.getStatus() != RecruitStatus.RECRUITING) {
            throw new IllegalStateException("모집이 마감된 글입니다.");
        }
        // 2-3. 중복 지원 방지
        if (applicationRepository.existsByRecruitPostIdAndApplicantId(postId, applicant.getId())) {
            throw new IllegalStateException("이미 이 게시글에 신청했습니다.");
        }

        Team applicantTeam = null;
        if (requestDto.getApplicantTeamId() != null) {
            applicantTeam = teamRepository.findById(requestDto.getApplicantTeamId())
                    .orElseThrow(() -> new IllegalArgumentException("신청하려는 팀을 찾을 수 없습니다."));
            // TODO: 신청자가 해당 팀의 팀장 또는 관리자인지 확인하는 로직 추가 가능
        }

        // 3. Application 엔티티 생성 및 저장
        Application newApplication = Application.builder()
                .recruitPost(recruitPost)
                .applicant(applicant)
                .applicantTeam(applicantTeam) // 팀 신청이 아니면 null
                .message(requestDto.getMessage())
                .applicationStatus(ApplicationStatus.PENDING) // 초기 상태는 '대기중'
                .build();

        Application savedApplication = applicationRepository.save(newApplication);
        notificationService.notifyApplication(recruitPost.getId(), savedApplication.getId(), recruitPost.getAuthor()); // post ID, Application ID, 이 알람을 수신할 User의 getId
        return savedApplication;
    }
}