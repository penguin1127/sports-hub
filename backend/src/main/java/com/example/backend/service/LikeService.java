// com/example/backend/service/LikeService.java
package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.TeamPostLikeRepository;
import com.example.backend.repository.TeamPostRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {

    private final TeamPostLikeRepository likeRepository;
    private final UserRepository userRepository;
    private final TeamPostRepository postRepository;

    /**
     * 게시글 좋아요 토글 (좋아요/좋아요 취소)
     * @return 새로운 좋아요 상태 (true: 좋아요, false: 좋아요 취소)
     */
    public boolean toggleLike(Long postId, String userLoginId) {
        User currentUser = userRepository.findByUserid(userLoginId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        TeamPost post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));

        TeamPostLikeId likeId = new TeamPostLikeId(currentUser.getId(), post.getId());
        Optional<TeamPostLike> existingLike = likeRepository.findById(likeId);

        if (existingLike.isPresent()) {
            // 이미 좋아요를 누른 상태 -> 좋아요 취소
            likeRepository.delete(existingLike.get());
            return false;
        } else {
            // 좋아요를 누르지 않은 상태 -> 좋아요
            TeamPostLike newLike = TeamPostLike.builder()
                    .user(currentUser)
                    .post(post)
                    .build();
            likeRepository.save(newLike);
            return true;
        }
    }
}