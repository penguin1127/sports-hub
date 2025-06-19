// src/main/java/com/example/backend/controller/TeamController.java
package com.example.backend.controller;

import com.example.backend.dto.team.TeamCreateRequestDto;
import com.example.backend.dto.team.TeamUpdateRequestDto;
import com.example.backend.dto.team.TeamResponseDto;
import com.example.backend.service.TeamService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    // 1. 새 팀 생성
    // POST /api/teams
    @PostMapping
    public ResponseEntity<TeamResponseDto> createTeam(
            @RequestBody @Valid TeamCreateRequestDto createRequestDto,
            @AuthenticationPrincipal UserDetails userDetails) { // 현재 로그인한 사용자 정보 (주장이 됨)
        // userDetails.getUsername()은 로그인 ID (예: "test1234")를 반환합니다.
        String currentUserId = userDetails.getUsername();

        TeamResponseDto newTeam = teamService.createTeam(createRequestDto, currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTeam);
    }

    // 2. 모든 팀 목록 조회
    // GET /api/teams
    @GetMapping
    public ResponseEntity<List<TeamResponseDto>> getAllTeams() {
        List<TeamResponseDto> teams = teamService.getAllTeams();
        return ResponseEntity.ok(teams);
    }

    // 3. 특정 팀 상세 조회
    // GET /api/teams/{teamId}
    @GetMapping("/{teamId}")
    public ResponseEntity<TeamResponseDto> getTeamById(@PathVariable Long teamId) {
        TeamResponseDto team = teamService.getTeamById(teamId);
        return ResponseEntity.ok(team);
    }

    // 4. 특정 사용자가 주장인 팀 목록 조회 (마이페이지 등에서 사용)
    // GET /api/teams/my-captain-teams
    @GetMapping("/my-captain-teams")
    public ResponseEntity<List<TeamResponseDto>> getMyCaptainTeams(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long currentUserId = Long.valueOf(userDetails.getUsername());

        List<TeamResponseDto> teams = teamService.getTeamsByCaptain(currentUserId);
        return ResponseEntity.ok(teams);
    }

    // 5. 팀 정보 수정 (팀 주장만 가능)
    // PUT /api/teams/{teamId}
    @PutMapping("/{teamId}")
    public ResponseEntity<TeamResponseDto> updateTeam(
            @PathVariable Long teamId,
            @RequestBody @Valid TeamUpdateRequestDto updateRequestDto,
            @AuthenticationPrincipal UserDetails userDetails) { // 요청하는 사용자 정보 (권한 검증용)
        Long currentUserId = Long.valueOf(userDetails.getUsername());

        TeamResponseDto updatedTeam = teamService.updateTeam(teamId, updateRequestDto, currentUserId);
        return ResponseEntity.ok(updatedTeam);
    }

    // 6. 팀 해체 (팀 주장만 가능)
    // DELETE /api/teams/{teamId}
    @DeleteMapping("/{teamId}")
    public ResponseEntity<Void> deleteTeam(
            @PathVariable Long teamId,
            @AuthenticationPrincipal UserDetails userDetails) { // 요청하는 사용자 정보 (권한 검증용)
        Long currentUserId = Long.valueOf(userDetails.getUsername());

        teamService.deleteTeam(teamId, currentUserId);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}