// com/example/backend/repository/TeamPostCommentRepository.java
package com.example.backend.repository;

import com.example.backend.entity.TeamPostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeamPostCommentRepository extends JpaRepository<TeamPostComment, Long> {

    // 특정 게시글의 모든 댓글을 작성 시간 오름차순으로 조회
    List<TeamPostComment> findByPostIdOrderByCreatedAtAsc(Long postId);
}