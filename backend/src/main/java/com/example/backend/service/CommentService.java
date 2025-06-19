// com/example/backend/service/CommentService.java
package com.example.backend.service;

import com.example.backend.dto.comment.CommentRequestDto;
import com.example.backend.dto.comment.CommentResponseDto;
import com.example.backend.entity.TeamPost;
import com.example.backend.entity.TeamPostComment;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repository.TeamPostCommentRepository;
import com.example.backend.repository.TeamPostRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final TeamPostRepository teamPostRepository;
    private final UserRepository userRepository;
    private final TeamPostCommentRepository commentRepository;
    private final UserTeamRepository userTeamRepository;

    // 댓글 생성
    public CommentResponseDto createComment(Long postId, CommentRequestDto requestDto, String userLoginId) {
        User currentUser = userRepository.findByUserid(userLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다: " + userLoginId));

        TeamPost post = teamPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다: " + postId));

        // 권한 확인: 해당 팀의 멤버만 댓글 작성 가능
        boolean isMember = userTeamRepository.existsByUserIdAndTeamId(currentUser.getId(), post.getTeam().getId());
        if (!isMember) {
            throw new UnauthorizedException("댓글을 작성할 권한이 없습니다.");
        }

        TeamPostComment comment = TeamPostComment.builder()
                .post(post)
                .author(currentUser)
                .content(requestDto.getContent())
                .build();

        TeamPostComment savedComment = commentRepository.save(comment);
        return CommentResponseDto.fromEntity(savedComment);
    }

    // 특정 게시글의 댓글 목록 조회
    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByPostId(Long postId) {
        if (!teamPostRepository.existsById(postId)) {
            throw new ResourceNotFoundException("게시글을 찾을 수 없습니다: " + postId);
        }

        List<TeamPostComment> comments = commentRepository.findByPostIdOrderByCreatedAtAsc(postId);
        return comments.stream()
                .map(CommentResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}