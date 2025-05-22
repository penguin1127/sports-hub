// src/main/java/com/example/backend/service/UserTeamService.java
package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.Team;
import com.example.backend.entity.UserTeam;
import com.example.backend.entity.UserTeamId;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.TeamRepository;
import com.example.backend.repository.UserTeamRepository;
import com.example.backend.dto.userteam.UserTeamJoinRequestDto;
import com.example.backend.dto.userteam.UserTeamUpdateRequestDto;
import com.example.backend.dto.userteam.UserTeamResponseDto;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.DuplicateException; // 이미 가입된 경우 처리
import com.example.backend.exception.UnauthorizedException; // 권한 없음 예외

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 사용자-팀 관계(UserTeam) 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserTeamService {

    private final UserTeamRepository userTeamRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    // 1. 팀 가입 (사용자가 특정 팀에 멤버로 가입)
    public UserTeamResponseDto joinTeam(UserTeamJoinRequestDto joinDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        Team team = teamRepository.findById(joinDto.getTeamId())
                .orElseThrow(() -> new ResourceNotFoundException("팀을 찾을 수 없습니다."));

        // 이미 해당 팀에 가입되어 있는지 확인
        UserTeamId userTeamId = new UserTeamId(userId, team.getId());
        if (userTeamRepository.existsById(userTeamId)) {
            throw new DuplicateException("이미 해당 팀에 가입되어 있습니다.");
        }

        // 새로운 UserTeam 관계 생성 (기본 역할은 "MEMBER", 활동 상태는 true)
        UserTeam userTeam = UserTeam.builder()
                .id(userTeamId)
                .user(user)
                .team(team)
                .joinedAt(LocalDateTime.now())
                .isActive(true)
                .roleInTeam("MEMBER") // 기본 역할: MEMBER
                .build();

        UserTeam savedUserTeam = userTeamRepository.save(userTeam);
        return UserTeamResponseDto.fromEntity(savedUserTeam);
    }

    // 2. 특정 사용자-팀 관계 조회
    public UserTeamResponseDto getUserTeamById(Long userId, Long teamId) {
        UserTeamId id = new UserTeamId(userId, teamId);
        UserTeam userTeam = userTeamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("해당 사용자-팀 관계를 찾을 수 없습니다."));
        return UserTeamResponseDto.fromEntity(userTeam);
    }

    // 3. 사용자가 가입한 모든 팀 조회
    public List<UserTeamResponseDto> getTeamsJoinedByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        List<UserTeam> userTeams = userTeamRepository.findByUser(user);
        return userTeams.stream()
                .map(UserTeamResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 4. 특정 팀의 모든 멤버 조회
    public List<UserTeamResponseDto> getAllMembersOfTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("팀을 찾을 수 없습니다."));
        List<UserTeam> userTeams = userTeamRepository.findByTeam(team);
        return userTeams.stream()
                .map(UserTeamResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 5. 사용자-팀 관계 정보 수정 (주로 리더가 멤버 역할/상태 변경)
    public UserTeamResponseDto updateUserTeam(
            Long targetUserId, // 수정 대상 사용자 ID
            Long targetTeamId, // 수정 대상 팀 ID
            UserTeamUpdateRequestDto updateDto,
            Long requestingUserId // 요청하는 사용자 (현재 로그인된 사용자)
    ) {
        // 수정 대상 UserTeam 관계 조회
        UserTeamId id = new UserTeamId(targetUserId, targetTeamId);
        UserTeam userTeam = userTeamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("수정할 사용자-팀 관계를 찾을 수 없습니다."));

        // 권한 검증: 팀 리더만 수정 가능
        // 요청하는 사용자가 해당 팀의 주장(captain)인지 확인
        Team team = userTeam.getTeam();
        if (!team.getCaptain().getId().equals(requestingUserId)) {
            throw new UnauthorizedException("팀 멤버 정보를 수정할 권한이 없습니다.");
        }

        // 역할 변경 로직
        Optional.ofNullable(updateDto.getRoleInTeam()).ifPresent(newRole -> {
            // "LEADER" 역할 부여는 신중하게 처리 (하나의 팀에 여러 리더를 허용할지, 기존 리더 해제 로직 필요 여부 등)
            // 여기서는 단순 String 변경만 허용
            userTeam.setRoleInTeam(newRole);
        });

        // 활동 상태 변경 로직
        Optional.ofNullable(updateDto.getIsActive()).ifPresent(userTeam::setIsActive);

        UserTeam updatedUserTeam = userTeamRepository.save(userTeam);
        return UserTeamResponseDto.fromEntity(updatedUserTeam);
    }

    // 6. 팀 탈퇴 (사용자가 팀에서 나감)
    public void leaveTeam(Long userId, Long teamId, Long requestingUserId) {
        UserTeamId id = new UserTeamId(userId, teamId);
        UserTeam userTeam = userTeamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("탈퇴할 사용자-팀 관계를 찾을 수 없습니다."));

        // 권한 검증: 본인만 탈퇴 가능하거나, 팀 주장이 강퇴 가능
        // 현재는 본인만 탈퇴 가능하도록 구현
        if (!userTeam.getUser().getId().equals(requestingUserId)) {
            throw new UnauthorizedException("다른 사용자를 탈퇴시킬 권한이 없습니다.");
        }

        // 만약 탈퇴하려는 사용자가 팀의 주장(captain)이라면, 팀 해체 또는 주장 위임 로직 필요
        if (userTeam.getRoleInTeam().equals("LEADER") && userTeam.getTeam().getCaptain().getId().equals(userId)) {
            // TODO: 리더가 팀을 탈퇴할 경우, 팀 해체 로직 또는 다른 멤버에게 리더 위임 로직 구현 필요
            // 현재는 단순히 탈퇴만 허용하면 팀이 리더를 잃게 됨
            throw new UnauthorizedException("팀 주장은 팀을 탈퇴할 수 없습니다. 팀 해체 또는 주장 위임을 먼저 진행해주세요.");
        }


        userTeamRepository.delete(userTeam);
    }

    // 7. 팀에서 강퇴 (팀 리더가 멤버를 내보냄)
    public void kickUserFromTeam(Long targetUserId, Long targetTeamId, Long requestingUserId) {
        UserTeamId id = new UserTeamId(targetUserId, targetTeamId);
        UserTeam userTeam = userTeamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("강퇴할 사용자-팀 관계를 찾을 수 없습니다."));

        // 권한 검증: 요청하는 사용자가 해당 팀의 주장(captain)이어야 함
        Team team = userTeam.getTeam();
        if (!team.getCaptain().getId().equals(requestingUserId)) {
            throw new UnauthorizedException("팀에서 멤버를 강퇴할 권한이 없습니다.");
        }

        // 자기 자신을 강퇴하는 것을 방지 (팀 리더가 실수로 자신을 강퇴하는 경우)
        if (targetUserId.equals(requestingUserId)) {
            throw new UnauthorizedException("자기 자신을 강퇴할 수 없습니다. 팀 해체 또는 주장 위임을 사용해주세요.");
        }

        // 강퇴 대상이 팀 리더인 경우 (리더는 강퇴 불가능, 위임 후 탈퇴만 가능)
        if (userTeam.getRoleInTeam().equals("LEADER")) {
            throw new UnauthorizedException("팀 주장은 강퇴할 수 없습니다. 주장 위임을 먼저 진행해주세요.");
        }

        userTeamRepository.delete(userTeam);
    }
}