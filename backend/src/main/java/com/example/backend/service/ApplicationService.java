package com.example.backend.service;

import com.example.backend.dto.application.ApplicationRequestDto;
import com.example.backend.dto.application.ApplicationResponseDto;
import com.example.backend.dto.application.ReceivedApplicationResponseDto;
import com.example.backend.entity.*;
import com.example.backend.enums.ApplicationStatus;
import com.example.backend.enums.RecruitCategory;
import com.example.backend.enums.RecruitStatus;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final RecruitPostRepository recruitPostRepository;
    private final TeamRepository teamRepository;
    private final UserTeamRepository userTeamRepository;
    // private final NotificationService notificationService; // 알림 기능 구현 시 주석 해제

    @Transactional
    public Application createApplication(Long postId, ApplicationRequestDto requestDto, String applicantLoginId) {
        // 1. 필요한 엔티티 조회
        User applicant = userRepository.findByUserid(applicantLoginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        RecruitPost recruitPost = recruitPostRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("모집글을 찾을 수 없습니다."));

        // 2. 비즈니스 로직 검증
        if (recruitPost.getAuthor().getId().equals(applicant.getId())) {
            throw new AccessDeniedException("본인이 작성한 글에는 신청할 수 없습니다.");
        }
        if (recruitPost.getStatus() != RecruitStatus.RECRUITING) {
            throw new IllegalStateException("모집이 마감된 글입니다.");
        }
        if (applicationRepository.existsByRecruitPostIdAndApplicantId(postId, applicant.getId())) {
            throw new IllegalStateException("이미 이 게시글에 신청했습니다.");
        }

        Team applicantTeam = null;
        if (requestDto.getApplicantTeamId() != null) {
            applicantTeam = teamRepository.findById(requestDto.getApplicantTeamId())
                    .orElseThrow(() -> new IllegalArgumentException("신청하려는 팀을 찾을 수 없습니다."));
        }

        // 3. Application 엔티티 생성
        Application newApplication = new Application();
        newApplication.setApplicant(applicant);
        newApplication.setRecruitPost(recruitPost);
        newApplication.setApplicantTeam(applicantTeam);
        newApplication.setMessage(requestDto.getMessage());
        newApplication.setApplicationStatus(ApplicationStatus.PENDING);

        Application savedApplication = applicationRepository.save(newApplication);

        // TODO: 알림 기능 구현 시 여기에 알림 전송 로직 추가
        // notificationService.notifyApplication(recruitPost.getAuthor(), savedApplication);

        return savedApplication;
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponseDto> getApplicationsForUser(String loginId) {
        User user = userRepository.findByUserid(loginId).orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        List<Application> applications = applicationRepository.findByApplicantIdOrderByAppliedAtDesc(user.getId());
        return applications.stream().map(ApplicationResponseDto::fromEntity).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReceivedApplicationResponseDto> getReceivedApplications(String loginId) {
        User user = userRepository.findByUserid(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        List<Application> applications = applicationRepository.findApplicationsByPostAuthorId(user.getId());
        return applications.stream()
                .map(ReceivedApplicationResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void acceptApplication(Long applicationId, String currentLoginId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청입니다."));
        RecruitPost post = application.getRecruitPost();
        User applicant = application.getApplicant();

        if (!post.getAuthor().getUserid().equals(currentLoginId)) {
            throw new AccessDeniedException("이 신청을 처리할 권한이 없습니다.");
        }
        if (application.getApplicationStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException("이미 처리된 신청입니다.");
        }

        application.setApplicationStatus(ApplicationStatus.ACCEPTED);

        if (post.getCategory() == RecruitCategory.TEAM) {
            Team team = post.getPostingTeam();
            if (team == null) throw new IllegalStateException("팀원 모집 게시글이 아닙니다.");
            UserTeam newUserTeam = UserTeam.builder().id(new UserTeamId(applicant.getId(), team.getId())).user(applicant).team(team).roleInTeam("MEMBER").isActive(true).build();
            userTeamRepository.save(newUserTeam);
        }

        if (post.getRequiredPersonnel() != null && post.getRequiredPersonnel() <= 1) {
            post.setStatus(RecruitStatus.COMPLETED);
            List<Application> otherApps = applicationRepository.findByRecruitPostIdAndApplicationStatus(post.getId(), ApplicationStatus.PENDING);
            for (Application otherApp : otherApps) {
                otherApp.setApplicationStatus(ApplicationStatus.REJECTED);
                otherApp.setRejectionReason("모집 인원이 마감되어 자동으로 신청이 거절되었습니다.");
            }
        }
    }

    @Transactional
    public void rejectApplication(Long applicationId, String currentLoginId, String reason) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청입니다."));
        if (!application.getRecruitPost().getAuthor().getUserid().equals(currentLoginId)) {
            throw new AccessDeniedException("이 신청을 처리할 권한이 없습니다.");
        }
        if (application.getApplicationStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException("이미 처리된 신청입니다.");
        }
        application.setApplicationStatus(ApplicationStatus.REJECTED);
        application.setRejectionReason(reason);
    }

    @Transactional
    public void cancelApplication(Long applicationId, String currentLoginId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청입니다."));
        if (!application.getApplicant().getUserid().equals(currentLoginId)) {
            throw new AccessDeniedException("본인의 신청만 취소할 수 있습니다.");
        }
        if (application.getApplicationStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException("대기중인 신청만 취소할 수 있습니다.");
        }
        applicationRepository.delete(application);
    }
}