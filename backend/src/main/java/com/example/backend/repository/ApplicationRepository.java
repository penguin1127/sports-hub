// src/main/java/com/example/backend/repository/ApplicationRepository.java
package com.example.backend.repository;

import com.example.backend.entity.Application;
import com.example.backend.entity.RecruitPost; // 모집 게시글 import
import com.example.backend.entity.User;         // 신청자 User import
import com.example.backend.entity.Team;         // 신청 팀 import
import com.example.backend.enums.ApplicationStatus; // 신청 상태 ENUM import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Application 엔티티를 위한 JPA Repository 인터페이스
 * 모집 신청 관련 조회 기능 제공
 */
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // 특정 모집 게시글에 대한 모든 신청 조회
    List<Application> findByRecruitPost(RecruitPost recruitPost);

    // 특정 모집 게시글에 대해 특정 신청 상태의 신청 조회
    List<Application> findByRecruitPostAndApplicationStatus(RecruitPost recruitPost, ApplicationStatus applicationStatus);

    // 특정 사용자가 신청한 모든 신청 조회 (개인 신청 또는 팀 신청의 주체로서)
    List<Application> findByApplicant(User applicant);

    // 특정 사용자가 특정 모집 게시글에 신청한 이력이 있는지 확인
    Optional<Application> findByRecruitPostAndApplicant(RecruitPost recruitPost, User applicant);

    // 특정 팀이 신청한 모든 신청 조회 (applicantTeam이 있는 경우)
    List<Application> findByApplicantTeam(Team applicantTeam);

    // 특정 모집 게시글에 특정 팀이 신청한 이력이 있는지 확인
    Optional<Application> findByRecruitPostAndApplicantTeam(RecruitPost recruitPost, Team applicantTeam);

    // 특정 사용자가 특정 게시글에 이미 신청했고, 그 신청이 특정 상태인지 확인
    boolean existsByRecruitPostAndApplicantAndApplicationStatus(RecruitPost recruitPost, User applicant, ApplicationStatus applicationStatus);

    // 특정 팀이 특정 게시글에 이미 신청했고, 그 신청이 특정 상태인지 확인
    boolean existsByRecruitPostAndApplicantTeamAndApplicationStatus(RecruitPost recruitPost, Team applicantTeam, ApplicationStatus applicationStatus);

    // 신청 상태별로 신청 조회 (전체)
    List<Application> findByApplicationStatus(ApplicationStatus applicationStatus);
}