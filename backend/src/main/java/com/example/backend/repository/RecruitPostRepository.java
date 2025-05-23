package com.example.backend.repository;

import com.example.backend.entity.RecruitPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * RecruitPost에 대한 DB 접근을 담당하는 JPA 리포지토리
 */

public interface RecruitPostRepository extends JpaRepository<RecruitPost, Long> {
}
