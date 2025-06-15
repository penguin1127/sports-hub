package com.example.backend.service;

import com.example.backend.dto.application.ApplicationResponseDto;
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

    @Transactional
    public Application createApplication(Long postId, ApplicationRequestDto requestDto, String applicantLoginId) {
        // 1. 필요한 엔티티 조회 (이전과 동일)

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
        }

        // 3. Application 엔티티 생성
        Application newApplication = Application.builder()
                .applicant(applicant)
                .applicantTeam(applicantTeam)
                .message(requestDto.getMessage())
                .applicationStatus(ApplicationStatus.PENDING)
                .build();

        // 4. recruitPost에 application을 추가하여 양방향 관계의 일관성을 맞춰줍니다. (이전과 동일)
        recruitPost.addApplication(newApplication);

        // ▼▼▼ 5. 핵심 변경사항: Application을 직접 저장합니다. ▼▼▼
        // recruitPost를 저장하는 대신, 관계의 주인인 newApplication을 직접 저장합니다.
        return applicationRepository.save(newApplication);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponseDto> getApplicationsForUser(String loginId) {
        User user = userRepository.findByUserid(loginId).orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        List<Application> applications = applicationRepository.findByApplicantIdOrderByAppliedAtDesc(user.getId());
        return applications.stream().map(ApplicationResponseDto::fromEntity).collect(Collectors.toList());
    }

    @Transactional
    public void acceptApplication(Long applicationId, String currentLoginId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청입니다."));
        RecruitPost post = application.getRecruitPost();

        if (!post.getAuthor().getUserid().equals(currentLoginId)) throw new AccessDeniedException("이 신청을 처리할 권한이 없습니다.");
        if (application.getApplicationStatus() != ApplicationStatus.PENDING) throw new IllegalStateException("이미 처리된 신청입니다.");

        application.setApplicationStatus(ApplicationStatus.ACCEPTED);

        if (post.getCategory() == RecruitCategory.TEAM) {
            User applicant = application.getApplicant();
            Team team = post.getPostingTeam();
            if (team == null) throw new IllegalStateException("팀원 모집 게시글이 아닙니다.");
            UserTeam newUserTeam = UserTeam.builder().id(new UserTeamId(applicant.getId(), team.getId())).user(applicant).team(team).roleInTeam("MEMBER").isActive(true).build();
            userTeamRepository.save(newUserTeam);
        }

        // TODO: 알림 기능 - applicant에게 "신청이 수락되었습니다" 알림 전송

        if (post.getRequiredPersonnel() != null && post.getRequiredPersonnel() <= 1) {
            post.setStatus(RecruitStatus.COMPLETED);
            List<Application> otherApps = applicationRepository.findByRecruitPostIdAndApplicationStatus(post.getId(), ApplicationStatus.PENDING);
            for (Application otherApp : otherApps) {
                otherApp.setApplicationStatus(ApplicationStatus.REJECTED);
                otherApp.setRejectionReason("모집 인원이 마감되어 자동으로 신청이 거절되었습니다.");
                // TODO: 알림 기능 - otherApp.getApplicant()에게 "자동 거절" 알림 전송
            }
        }
    }

    @Transactional
    public void rejectApplication(Long applicationId, String currentLoginId, String reason) { // 거절 사유를 파라미터로 받을 수 있음
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청입니다."));
        if (!application.getRecruitPost().getAuthor().getUserid().equals(currentLoginId)) throw new AccessDeniedException("이 신청을 처리할 권한이 없습니다.");
        if (application.getApplicationStatus() != ApplicationStatus.PENDING) throw new IllegalStateException("이미 처리된 신청입니다.");

        application.setApplicationStatus(ApplicationStatus.REJECTED);
        application.setRejectionReason(reason);
        // TODO: 알림 기능 - applicant에게 "신청이 거절되었습니다" 알림 전송
    }

    @Transactional
    public void cancelApplication(Long applicationId, String currentLoginId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청입니다."));
        if (!application.getApplicant().getUserid().equals(currentLoginId)) throw new AccessDeniedException("본인의 신청만 취소할 수 있습니다.");
        if (application.getApplicationStatus() != ApplicationStatus.PENDING) throw new IllegalStateException("대기중인 신청만 취소할 수 있습니다.");

        applicationRepository.delete(application);
        // TODO: 알림 기능 - 게시글 작성자에게 "B님이 신청을 취소했습니다" 알림 전송
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