// com/example/backend/repository/TeamPostLikeRepository.java
package com.example.backend.repository;

import com.example.backend.entity.TeamPostLike;
import com.example.backend.entity.TeamPostLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamPostLikeRepository extends JpaRepository<TeamPostLike, TeamPostLikeId> {
}