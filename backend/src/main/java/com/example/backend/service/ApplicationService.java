package com.example.backend.service;

import com.example.backend.dto.application.ApplicationRequestDto;
import com.example.backend.dto.application.ApplicationResponseDto;
import com.example.backend.dto.application.ReceivedApplicationResponseDto;
import com.example.backend.entity.*;
import com.example.backend.enums.ApplicationStatus;
import com.example.backend.enums.NotificationType;
import com.example.backend.exception.DuplicateException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final RecruitPostRepository recruitPostRepository;
    private final TeamRepository teamRepository;
    private final NotificationService notificationService;

    /**
     * 개인이 팀의 용병 모집글에 지원하는 메서드
     */
    public ApplicationResponseDto applyAsMercenary(Long postId, String userLoginId) {
        User applicant = userRepository.findByUserid(userLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        RecruitPost teamPost = recruitPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("모집글을 찾을 수 없습니다."));

        if (applicationRepository.existsByApplicantUserAndRecruitPost(applicant, teamPost)) {
            throw new DuplicateException("이미 해당 모집글에 지원했습니다.");
        }

        Application application = Application.builder()
                .applicantUser(applicant)
                .recruitPost(teamPost)
                .status(ApplicationStatus.PENDING)
                .build();
        Application savedApplication = applicationRepository.save(application);

        // [⚡️알림 발송]
        User recipient = teamPost.getPostingTeam().getCaptain();
        String message = applicant.getName() + "님이 회원님의 용병 모집에 지원했습니다.";
        String url = "/applications/received"; // 받은 신청 목록 페이지로 이동
        notificationService.createAndSendNotification(recipient, NotificationType.APPLICATION_SUBMITTED, message, url);

        return ApplicationResponseDto.fromEntity(savedApplication);
    }

    /**
     * 팀이 개인에게 영입/용병 제안을 보내는 메서드
     */
    public ApplicationResponseDto proposeToIndividual(Long postId, ApplicationRequestDto requestDto, String captainLoginId) {
        User captain = userRepository.findByUserid(captainLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        RecruitPost individualPost = recruitPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("모집글을 찾을 수 없습니다."));
        Team applicantTeam = teamRepository.findById(requestDto.getApplicantTeamId())
                .orElseThrow(() -> new ResourceNotFoundException("제안하는 팀을 찾을 수 없습니다."));

        if (!applicantTeam.getCaptain().getId().equals(captain.getId())) {
            throw new AccessDeniedException("팀을 대표하여 제안할 권한이 없습니다.");
        }
        if (applicationRepository.existsByApplicantTeamAndRecruitPost(applicantTeam, individualPost)) {
            throw new DuplicateException("이미 이 게시글에 영입 제안을 했습니다.");
        }

        Application application = Application.builder()
                .applicant(captain) // 실제 행위자
                .applicantTeam(applicantTeam) // 신청의 주체
                .recruitPost(individualPost) // 대상 게시글
                .message(requestDto.getMessage())
                .status(ApplicationStatus.PENDING)
                .build();
        Application savedApplication = applicationRepository.save(application);

        // [⚡️알림 발송]
        User recipient = individualPost.getAuthor();
        String message = applicantTeam.getName() + " 팀에서 회원님께 영입을 제안했습니다.";
        String url = "/applications/my"; // 내 신청 현황 페이지로 이동
        notificationService.createAndSendNotification(recipient, NotificationType.TEAM_INVITE, message, url);

        return ApplicationResponseDto.fromEntity(savedApplication);
    }

    /**
     * 내가 보낸 신청 목록 조회
     */
    @Transactional(readOnly = true)
    public List<ApplicationResponseDto> getApplicationsForUser(String loginId) {
        User user = userRepository.findByUserid(loginId).orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        List<Application> applications = applicationRepository.findByApplicantId(user.getId());
        return applications.stream().map(ApplicationResponseDto::fromEntity).collect(Collectors.toList());
    }

    /**
     * 내가 받은 신청 목록 조회
     */
    @Transactional(readOnly = true)
    public List<ReceivedApplicationResponseDto> getReceivedApplications(String loginId) {
        User user = userRepository.findByUserid(loginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        List<Application> applications = applicationRepository.findByRecruitPost_Author_Id(user.getId());
        return applications.stream()
                .map(ReceivedApplicationResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 신청 수락 (결정권자: 게시글 작성자)
     */
    @Transactional
    public void acceptApplication(Long applicationId, String processorLoginId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 신청입니다."));
        User processor = userRepository.findByUserid(processorLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        if (!application.getRecruitPost().getAuthor().getId().equals(processor.getId())) {
            throw new AccessDeniedException("이 신청을 처리할 권한이 없습니다.");
        }
        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException("이미 처리된 신청입니다.");
        }

        application.setStatus(ApplicationStatus.ACCEPTED);

        // [⚡️알림 발송]
        User recipient = application.getApplicant();
        String message = "신청하신 '" + application.getRecruitPost().getTitle() + "' 건이 수락되었습니다.";
        String url = "/applications/my";
        notificationService.createAndSendNotification(recipient, NotificationType.APPLICATION_APPROVED, message, url);
    }

    /**
     * 신청 거절 (결정권자: 게시글 작성자)
     */
    @Transactional
    public void rejectApplication(Long applicationId, String processorLoginId, String reason) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 신청입니다."));
        User processor = userRepository.findByUserid(processorLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        if (!application.getRecruitPost().getAuthor().getId().equals(processor.getId())) {
            throw new AccessDeniedException("이 신청을 처리할 권한이 없습니다.");
        }
        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException("이미 처리된 신청입니다.");
        }

        application.setStatus(ApplicationStatus.REJECTED);
        application.setRejectionReason(reason);

        // [⚡️알림 발송]
        User recipient = application.getApplicant();
        String message = "아쉽지만, '" + application.getRecruitPost().getTitle() + "' 건이 거절되었습니다.";
        String url = "/applications/my";
        notificationService.createAndSendNotification(recipient, NotificationType.APPLICATION_REJECTED, message, url);
    }

    /**
     * 내 신청 취소 (신청자 본인)
     */
    @Transactional
    public void cancelApplication(Long applicationId, String userLoginId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 신청입니다."));
        User currentUser = userRepository.findByUserid(userLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        if (!application.getApplicant().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("본인의 신청만 취소할 수 있습니다.");
        }
        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException("대기중인 신청만 취소할 수 있습니다.");
        }

        applicationRepository.delete(application);
    }
}