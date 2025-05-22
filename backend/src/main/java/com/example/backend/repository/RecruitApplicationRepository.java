package com.example.backend.repository;

import com.example.backend.entity.RecruitApplication;
import org.springframework.data.jpa.repository.JpaRepository;

// 용병 신청 테이블에 접근함.
public interface RecruitApplicationRepository extends JpaRepository<RecruitApplication, Integer> {

}
