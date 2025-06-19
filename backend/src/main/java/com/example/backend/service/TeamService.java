// src/main/java/com/example/backend/service/TeamService.java
package com.example.backend.service;

import com.example.backend.entity.Team;
import com.example.backend.entity.User;
import com.example.backend.entity.UserTeam;
import com.example.backend.entity.UserTeamId; // ✅ UserTeamId import 추가
// import com.example.backend.enums.RoleInTeam; // RoleInTeam ENUM 더 이상 사용 안함
import com.example.backend.repository.TeamRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.UserTeamRepository;
import com.example.backend.dto.team.TeamCreateRequestDto;
import com.example.backend.dto.team.TeamUpdateRequestDto;
import com.example.backend.dto.team.TeamResponseDto;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.UnauthorizedException;

import jakarta.transaction.Transactional;
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

        return TeamResponseDto.fromEntity(savedTeam);
    }

    // 2. 모든 팀 조회
    public List<TeamResponseDto> getAllTeams() {
        return teamRepository.findAll().stream()
                .map(TeamResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 3. 특정 팀 조회
    public TeamResponseDto getTeamById(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("팀을 찾을 수 없습니다."));
        return TeamResponseDto.fromEntity(team);
    }

    // 4. 팀 정보 수정
    public TeamResponseDto updateTeam(Long teamId, TeamUpdateRequestDto updateDto, Long currentUserId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("수정할 팀을 찾을 수 없습니다."));

        if (!team.getCaptain().getId().equals(currentUserId)) {
            throw new UnauthorizedException("팀 정보를 수정할 권한이 없습니다.");
        }

        Optional.ofNullable(updateDto.getName()).ifPresent(team::setName);
        Optional.ofNullable(updateDto.getRegion()).ifPresent(team::setRegion);
        Optional.ofNullable(updateDto.getDescription()).ifPresent(team::setDescription);
        Optional.ofNullable(updateDto.getLogoUrl()).ifPresent(team::setLogoUrl);
        Optional.ofNullable(updateDto.getHomeGround()).ifPresent(team::setHomeGround);

        Team updatedTeam = teamRepository.save(team);
        return TeamResponseDto.fromEntity(updatedTeam);
    }

    // 5. 팀 해체 (삭제)
    public void deleteTeam(Long teamId, Long currentUserId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("삭제할 팀을 찾을 수 없습니다."));

        if (!team.getCaptain().getId().equals(currentUserId)) {
            throw new UnauthorizedException("팀을 해체할 권한이 없습니다.");
        }

        // 먼저 UserTeam 관계를 삭제
        userTeamRepository.deleteByTeam(team); // ✅ UserTeamRepository에 정의된 메서드 호출

        // 그 다음 팀 삭제
        teamRepository.delete(team);
    }

    // 6. 사용자가 주장인 모든 팀 조회
    public List<TeamResponseDto> getTeamsByCaptain(Long captainUserId) {
        User captainUser = userRepository.findById(captainUserId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        List<Team> teams = teamRepository.findByCaptain(captainUser); // ✅ 반환 타입이 List<Team>이므로 호환 문제 해결
        return teams.stream()
                .map(TeamResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}