package com.example.backend.service;

import com.example.backend.dto.auth.ApplicationRequestDTO;
import com.example.backend.dto.auth.ApplicationResponseDTO;
import com.example.backend.entity.*;
import com.example.backend.enums.ApplicationStatus;
import com.example.backend.enums.Position;
import com.example.backend.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

// 용병, 경기, 팀 신청을 처리하는 컨트롤러를 처리하는 서비스
@AllArgsConstructor
@Service
public class ApplicationService {

    final private TeamRepository teamRepository; // 팀으로 신청하는 경우 사용
    final private RecruitPostRepository recruitPostRepository; // 어떤 모집글에 대한 신청인지 확인하기 위해 사용
    final private ApplicationRepository applicationRepository; // 최종적으로 Application 엔티티를 DB에 저장하기 위해 사용

    // IllegalArgumentException: 유효하지 않거나 부적절한 인수를 넣었을 때 발생되는 예외 처리

    public ApplicationResponseDTO apply(ApplicationRequestDTO dto, User applicant){

        // 모집글 조회
        RecruitPost post = recruitPostRepository.findById(dto.getRecruitPostId())
                .orElseThrow(() -> new IllegalArgumentException("모집글 없음"));

        // 팀으로 신청할 경우
        Team team = null;
        if(dto.getApplicantTeamId() != null){
            team = teamRepository.findById(dto.getApplicantTeamId())
                    .orElseThrow(() -> new IllegalArgumentException("팀 없음"));
        }

        // 중복 신청 방지 - 구현중
        /*
        boolean alreadyExists = applicationRepository.existsByRecruitPostAndApplicantAndApplicationStatus(new)
         */

        // 신청 엔티티 생성
        Application application = Application.builder()
                .applicant(applicant) // 신청 행위를 한 사용자
                .recruitPost(post) // 특정 모집글
                .applicantTeam(team) // 팀 신청일 때만
                .message(dto.getMessage()) // 신청할 때 자기소개
                .applicationStatus(ApplicationStatus.PENDING) // 초기 값 보류중
                .build();

        applicationRepository.save(application); //  방금 대입한 내용 db에 저장.
        // 응답 DTO 생성
        return ApplicationResponseDTO.builder()
                .applicationId(application.getId())
                .recruitTitle(post.getTitle())
                .applicantName(applicant.getName())
                .status(application.getApplicationStatus().name())
                .appliedAt(application.getAppliedAt())
                .build();
    }
}
