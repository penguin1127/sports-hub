// src/main/java/com/example/backend/service/TeamPostService.java
package com.example.backend.service;

import com.example.backend.dto.team.TeamPostResponseDto;
import com.example.backend.entity.TeamPost;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.TeamPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamPostService {

    private final TeamPostRepository teamPostRepository;

    /**
     * 특정 게시글의 상세 정보를 조회합니다.
     * 좋아요 수와 현재 사용자의 좋아요 여부를 포함합니다.
     */
    public TeamPostResponseDto getPostDetail(Long postId, User currentUser) {
        TeamPost post = teamPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다: " + postId));

        boolean isLiked = false;
        if (currentUser != null) {
            // 게시글의 'likes' Set을 순회하여 현재 사용자의 ID와 일치하는지 확인
            isLiked = post.getLikes().stream()
                    .anyMatch(like -> like.getUser().getId().equals(currentUser.getId()));
        }

        // TeamPostResponseDto를 빌더를 사용해 생성
        return TeamPostResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorId(post.getAuthor().getId())
                .authorName(post.getAuthor().getName())
                .createdAt(post.getCreatedAt())
                .likeCount(post.getLikes().size()) // 좋아요 개수
                .isLikedByCurrentUser(isLiked)      // 현재 사용자의 좋아요 여부
                .build();
    }
}