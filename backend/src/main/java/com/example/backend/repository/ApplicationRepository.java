// src/main/java/com/example/backend/repository/ApplicationRepository.java
package com.example.backend.repository;

import com.example.backend.entity.Application;
import com.example.backend.entity.RecruitPost;
import com.example.backend.entity.User;
import com.example.backend.entity.Team;
import com.example.backend.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // --- 기존에 작성하신 코드 (유지) ---
    List<Application> findByRecruitPost(RecruitPost recruitPost);
    List<Application> findByRecruitPostAndStatus(RecruitPost recruitPost, ApplicationStatus status);
    List<Application> findByApplicant(User applicant);
    Optional<Application> findByRecruitPostAndApplicant(RecruitPost recruitPost, User applicant);
    List<Application> findByApplicantTeam(Team applicantTeam);
    Optional<Application> findByRecruitPostAndApplicantTeam(RecruitPost recruitPost, Team applicantTeam);
    // ✅ 수정: ApplicationStatus -> Status
    boolean existsByRecruitPostAndApplicantAndStatus(RecruitPost recruitPost, User applicant, ApplicationStatus status);
    // ✅ 수정: ApplicationStatus -> Status
    boolean existsByRecruitPostAndApplicantTeamAndStatus(RecruitPost recruitPost, Team applicantTeam, ApplicationStatus status);
    List<Application> findByStatus(ApplicationStatus status);
    boolean existsByRecruitPostIdAndApplicantId(Long recruitPostId, Long applicantId);
    List<Application> findByApplicantIdOrderByAppliedAtDesc(Long applicantId);
    List<Application> findByRecruitPostIdOrderByAppliedAtDesc(Long recruitPostId);
    List<Application> findByRecruitPostIdAndApplicationStatus(Long recruitPostId, ApplicationStatus status);
    @Query("SELECT a FROM Application a WHERE a.recruitPost.author.id = :authorId ORDER BY a.appliedAt DESC")
    List<Application> findByRecruitPostIdAndStatus(Long recruitPostId, ApplicationStatus status);
    boolean existsByApplicantUserAndRecruitPost(User applicantUser, RecruitPost recruitPost);
    boolean existsByApplicantTeamAndRecruitPost(Team applicantTeam, RecruitPost recruitPost);

    // ▼▼▼ 1. 추가된 메서드 (Service의 getApplicationsForUser 오류 해결) ▼▼▼
    List<Application> findByApplicantId(Long applicantId);

    // ▼▼▼ 2. 추가된 메서드 (Service의 getReceivedApplications 오류 해결) ▼▼▼
    List<Application> findByRecruitPost_Author_Id(Long authorId);
}