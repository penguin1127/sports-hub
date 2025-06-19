// src/main/java/com/example/backend/service/TeamService.java
package com.example.backend.service;

import com.example.backend.dto.team.*;
import com.example.backend.entity.*;
import com.example.backend.repository.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.UnauthorizedException;

import jakarta.validation.Valid;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 팀 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
@Transactional
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final UserTeamRepository userTeamRepository;
    private final TeamAnnouncementRepository teamAnnouncementRepository;
    private final TeamPostRepository teamPostRepository;

    // 1. 팀 생성
    public TeamResponseDto createTeam(TeamCreateRequestDto createDto, String captainLoginId) { // ◀ 파라미터 타입을 String으로 변경
        User captainUser = userRepository.findByUserid(captainLoginId) // ◀ findByUserid 사용
                .orElseThrow(() -> new ResourceNotFoundException("팀 주장(사용자)을 찾을 수 없습니다."));

        Team team = Team.builder()
                .name(createDto.getName())
                .region(createDto.getRegion())
                .description(createDto.getDescription())
                .captain(captainUser)
                .logoUrl(createDto.getLogoUrl())
                .homeGround(createDto.getHomeGround())
                .build();
        Team savedTeam = teamRepository.save(team);

        // 팀 생성 시, 주장(captain)을 UserTeam 관계에 리더 역할로 추가
        UserTeam userTeam = UserTeam.builder()
                .id(new UserTeamId(captainUser.getId(), savedTeam.getId()))
                .user(captainUser)
                .team(savedTeam)
                .joinedAt(LocalDateTime.now())
                .isActive(true)
                .roleInTeam("CAPTAIN") // 주장은 CAPTAIN 역할로 지정
                .build();
        userTeamRepository.save(userTeam);

        return buildTeamResponseDto(savedTeam, "CAPTAIN");
    }

    // 2. 모든 팀 조회
    public List<TeamResponseDto> getAllTeams() {
        return teamRepository.findAll().stream()
                .map(team -> buildTeamResponseDto(team, null))
                .collect(Collectors.toList());
    }

    // 3. 특정 팀 조회 (핵심 수정 부분)
    @Transactional(readOnly = true)
    public TeamResponseDto getTeamById(Long teamId, User user) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("팀을 찾을 수 없습니다."));

        String myRole = null;
        if (user != null) {
            Optional<UserTeam> userTeamOpt = userTeamRepository.findById(new UserTeamId(user.getId(), team.getId()));
            if (userTeamOpt.isPresent()) {
                myRole = userTeamOpt.get().getRoleInTeam();
            }
        }
        return buildTeamResponseDto(team, myRole);
    }

    // 4. 팀 정보 수정
    public TeamResponseDto updateTeam(Long teamId, TeamUpdateRequestDto updateDto, String captainLoginId) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new ResourceNotFoundException("수정할 팀을 찾을 수 없습니다."));
        if (!team.getCaptain().getUserid().equals(captainLoginId)) {
            throw new UnauthorizedException("팀 정보를 수정할 권한이 없습니다.");
        }

        Optional.ofNullable(updateDto.getName()).ifPresent(team::setName);
        Optional.ofNullable(updateDto.getRegion()).ifPresent(team::setRegion);
        Optional.ofNullable(updateDto.getDescription()).ifPresent(team::setDescription);
        Optional.ofNullable(updateDto.getLogoUrl()).ifPresent(team::setLogoUrl);
        Optional.ofNullable(updateDto.getHomeGround()).ifPresent(team::setHomeGround);

        Team updatedTeam = teamRepository.save(team);
        return getTeamById(teamId, team.getCaptain());
    }

    // 5. 팀 해체 (삭제)
    public void deleteTeam(Long teamId, Long currentUserId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("삭제할 팀을 찾을 수 없습니다."));

        if (!team.getCaptain().getId().equals(currentUserId)) {
            throw new UnauthorizedException("팀을 해체할 권한이 없습니다.");
        }

        // 먼저 UserTeam 관계를 삭제
        userTeamRepository.deleteByTeam(team); //  UserTeamRepository에 정의된 메서드 호출

        // 그 다음 팀 삭제
        teamRepository.delete(team);
    }

    // 6. 사용자가 주장인 모든 팀 조회
    public List<TeamResponseDto> getTeamsByCaptain(Long captainUserId) {
        User captainUser = userRepository.findById(captainUserId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        List<Team> teams = teamRepository.findByCaptain(captainUser); // 반환 타입이 List<Team>이므로 호환 문제 해결
        return teams.stream()
                .map(team -> buildTeamResponseDto(team, "CAPTAIN"))
                .collect(Collectors.toList());
    }

    /**
     * 특정 팀의 팀원 목록 조회
     */
    @Transactional(readOnly = true)
    public List<TeamMemberResponseDto> getTeamMembers(Long teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new ResourceNotFoundException("팀을 찾을 수 없습니다.");
        }
        List<UserTeam> userTeams = userTeamRepository.findByTeamId(teamId);
        return userTeams.stream()
                .map(TeamMemberResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    private TeamResponseDto buildTeamResponseDto(Team team, String myRole) {
        return TeamResponseDto.builder()
                .id(team.getId()).name(team.getName()).region(team.getRegion()).subRegion(team.getSubRegion())
                .description(team.getDescription()).captainName(team.getCaptain().getName()).logoUrl(team.getLogoUrl())
                .homeGround(team.getHomeGround()).createdAt(team.getCreatedAt()).updatedAt(team.getUpdatedAt())
                .myRoleInTeam(myRole).build();
    }

    /**
     * 특정 팀의 공지사항 목록 조회
     */
    @Transactional(readOnly = true)
    public List<TeamAnnouncementResponseDto> getTeamAnnouncements(Long teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new ResourceNotFoundException("팀을 찾을 수 없습니다.");
        }
        return teamAnnouncementRepository.findByTeamIdOrderByCreatedAtDesc(teamId)
                .stream()
                .map(TeamAnnouncementResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    // '팀 게시글' 생성 메서드
    public TeamPostResponseDto createPost(Long teamId, PostRequestDto requestDto, String userLoginId) {
        User currentUser = userRepository.findByUserid(userLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("팀을 찾을 수 없습니다."));

        // 권한 확인: 요청한 사용자가 해당 팀의 멤버인지 확인
        boolean isMember = userTeamRepository.existsByUserIdAndTeamId(currentUser.getId(), team.getId());
        if (!isMember) {
            throw new UnauthorizedException("게시글을 작성할 권한이 없습니다.");
        }

        TeamPost post = TeamPost.builder()
                .team(team)
                .author(currentUser)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();

        TeamPost savedPost = teamPostRepository.save(post);
        return TeamPostResponseDto.fromEntity(savedPost);
    }

    /**
     * ▼▼▼ 이 메서드를 추가해주세요 ▼▼▼
     * 특정 팀의 게시글 목록 조회
     */
    @Transactional(readOnly = true)
    public List<TeamPostResponseDto> getTeamPosts(Long teamId) {
        if (!teamRepository.existsById(teamId)) {
            throw new ResourceNotFoundException("팀을 찾을 수 없습니다.");
        }
        // TeamPostRepository에 findByTeamIdOrderByCreatedAtDesc 메서드가 있어야 합니다.
        return teamPostRepository.findByTeamIdOrderByCreatedAtDesc(teamId)
                .stream()
                .map(TeamPostResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 공지사항 생성 메서드
     * @param teamId 공지사항을 등록할 팀의 ID
     * @param requestDto 제목과 내용이 담긴 DTO
     * @param userLoginId 요청한 사용자의 로그인 ID (주장인지 검사하기 위함)
     * @return 생성된 공지사항의 정보
     */
    @Transactional
    public TeamAnnouncementResponseDto createAnnouncement(Long teamId, PostRequestDto requestDto, String userLoginId) {
        // 1. 요청한 사용자의 정보를 찾습니다.
        User currentUser = userRepository.findByUserid(userLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        // 2. 공지사항을 등록할 팀의 정보를 찾습니다.
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("팀을 찾을 수 없습니다."));

        // 3. ★★★ 권한 확인 ★★★
        // 요청한 사용자가 해당 팀의 주장이 맞는지 확인합니다.
        if (!team.getCaptain().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("공지사항을 작성할 권한이 없습니다.");
        }

        // 4. 새로운 공지사항 엔티티를 생성합니다.
        TeamAnnouncement announcement = TeamAnnouncement.builder()
                .team(team)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();

        // 5. 데이터베이스에 저장합니다.
        TeamAnnouncement savedAnnouncement = teamAnnouncementRepository.save(announcement);

        // 6. DTO로 변환하여 반환합니다.
        return TeamAnnouncementResponseDto.fromEntity(savedAnnouncement);
    }
}