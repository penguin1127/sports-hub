// src/main/java/com/example/backend/controller/UserTeamController.java
package com.example.backend.controller;

import com.example.backend.dto.userteam.UserTeamJoinRequestDto;
import com.example.backend.dto.userteam.UserTeamUpdateRequestDto;
import com.example.backend.dto.userteam.UserTeamResponseDto;
import com.example.backend.service.UserTeamService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-teams")
@RequiredArgsConstructor
public class UserTeamController {

    private final UserTeamService userTeamService;

    // 1. 팀 가입 요청 (사용자가 팀에 가입)
    // POST /api/user-teams/join
    @PostMapping("/join")
    public ResponseEntity<UserTeamResponseDto> joinTeam(
            @RequestBody @Valid UserTeamJoinRequestDto joinRequestDto,
            @AuthenticationPrincipal UserDetails userDetails) { // 현재 로그인한 사용자 정보
        Long currentUserId = Long.valueOf(userDetails.getUsername()); // String userId를 Long으로 변환 가정

        UserTeamResponseDto newUserTeam = userTeamService.joinTeam(joinRequestDto, currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUserTeam);
    }

    // 2. 로그인한 사용자가 가입한 모든 팀 조회 (마이페이지 등에서 사용)
    // GET /api/user-teams/my-teams
    @GetMapping("/my-teams")
    public ResponseEntity<List<UserTeamResponseDto>> getMyTeams(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long currentUserId = Long.valueOf(userDetails.getUsername());

        List<UserTeamResponseDto> myTeams = userTeamService.getTeamsJoinedByUser(currentUserId);
        return ResponseEntity.ok(myTeams);
    }

    // 3. 특정 팀의 모든 멤버 조회 (팀 관리 페이지 등에서 사용)
    // GET /api/user-teams/teams/{teamId}/members
    @GetMapping("/teams/{teamId}/members")
    public ResponseEntity<List<UserTeamResponseDto>> getAllTeamMembers(
            @PathVariable Long teamId) {
        List<UserTeamResponseDto> teamMembers = userTeamService.getAllMembersOfTeam(teamId);
        return ResponseEntity.ok(teamMembers);
    }

    // 4. 특정 사용자-팀 관계 상세 조회 (예: 특정 멤버의 팀 내 역할 등)
    // GET /api/user-teams/users/{userId}/teams/{teamId}
    @GetMapping("/users/{userId}/teams/{teamId}")
    public ResponseEntity<UserTeamResponseDto> getUserTeamDetails(
            @PathVariable Long userId,
            @PathVariable Long teamId) {
        UserTeamResponseDto userTeam = userTeamService.getUserTeamById(userId, teamId);
        return ResponseEntity.ok(userTeam);
    }

    // 5. 팀 내 멤버 정보 수정 (예: 역할 변경, 활동 상태 변경 - 팀 리더만 가능)
    // PUT /api/user-teams/teams/{teamId}/members/{memberId}
    @PutMapping("/teams/{teamId}/members/{memberId}")
    public ResponseEntity<UserTeamResponseDto> updateTeamMemberInfo(
            @PathVariable Long teamId,
            @PathVariable(name = "memberId") Long targetUserId, // 수정 대상 멤버의 userId
            @RequestBody @Valid UserTeamUpdateRequestDto updateRequestDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long requestingUserId = Long.valueOf(userDetails.getUsername()); // 요청하는 사용자 ID

        UserTeamResponseDto updatedUserTeam = userTeamService.updateUserTeam(
                targetUserId, teamId, updateRequestDto, requestingUserId);
        return ResponseEntity.ok(updatedUserTeam);
    }

    // 6. 팀 탈퇴 (본인만 가능)
    // DELETE /api/user-teams/teams/{teamId}/leave
    @DeleteMapping("/teams/{teamId}/leave")
    public ResponseEntity<Void> leaveTeam(
            @PathVariable Long teamId,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long currentUserId = Long.valueOf(userDetails.getUsername());

        // 서비스 계층에서 본인 확인 로직 포함
        userTeamService.leaveTeam(currentUserId, teamId, currentUserId);
        return ResponseEntity.noContent().build();
    }

    // 7. 팀에서 멤버 강퇴 (팀 리더만 가능)
    // DELETE /api/user-teams/teams/{teamId}/members/{memberId}/kick
    @DeleteMapping("/teams/{teamId}/members/{memberId}/kick")
    public ResponseEntity<Void> kickTeamMember(
            @PathVariable Long teamId,
            @PathVariable(name = "memberId") Long targetUserId, // 강퇴 대상 멤버의 userId
            @AuthenticationPrincipal UserDetails userDetails) {
        Long requestingUserId = Long.valueOf(userDetails.getUsername()); // 요청하는 사용자 ID (리더)

        userTeamService.kickUserFromTeam(targetUserId, teamId, requestingUserId);
        return ResponseEntity.noContent().build();
    }
}