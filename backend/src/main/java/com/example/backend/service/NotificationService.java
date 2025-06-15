package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.enums.NotificationType;
import com.example.backend.repository.ApplicationRepository;
import com.example.backend.repository.NotificationDetailRepository;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.repository.RecruitPostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

// 알림을 통합처리하는 서비스
@RequiredArgsConstructor
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationDetailRepository notificationDetailRepository;

    private final RecruitPostRepository recruitPostRepository;
    private final ApplicationRepository applicationRepository;

    // 신청 알림을 처리하는 서비스
    @Transactional
    public void notifyApplication(Long recruitPostId, Long applicationId, User recipient) { // 모집공고 ID, 신청 ID, 모집공고 작성자의 ID

        //1. 필요한 데이터 조회
        RecruitPost post = recruitPostRepository.findById(recruitPostId) // Post ID 조회
                .orElseThrow(() -> new IllegalArgumentException("모집글을 찾을 수 없습니다."));

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("신청 정보를 찾을 수 없습니다."));

        User applicant = application.getApplicant(); // 신청자 userID 조회

        String message = applicant.getName()  + "님이 " + post.getTitle() + " 모집에 신청했습니다.";

        // 요약된 알림
        Notification notification = Notification.builder()
                .receiver(recipient) // 알림 받을 사람(모집글 작성자 id)
                .message(message)
                .type(NotificationType.APPLICATION_REJECTED) // 알림 종류(신청, 운영 알람 등이 있음 -> 여기서는 신청으로 함)
                .category(post.getToParticipant()) // 용병인지, 팀인지, 경기인지를 표시하는 카테고리
                .isRead(false) // 읽음 여부
                .createdAt(LocalDateTime.now()) // 알림 생성 시각
                .build();
        // 상세보기 알림
        NotificationDetail detail = NotificationDetail.builder()
                .notificationID(notification) // 요약된 알림 아이디
                .redirectUrl("/recruit-post/" + post.getId() + "/applications") // 클릭했을 때 이동시킬 경로
                .fullContent(application.getMessage()) // 사용자가 신청을 하였을 때의 메시지
                .build();

        notification.setDetail(detail); // 양방향 연관 관계 설정
        notificationRepository.save(notification); // cascade로 detail도 함께 저장됨
    }

}
