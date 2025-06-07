package com.example.backend.repository;

import com.example.backend.entity.MercenaryApplication;
import org.springframework.data.jpa.repository.JpaRepository;

// 용병 신청 테이블 관련 CRUD를 수행함.
public interface MercenaryApplicationRepository extends JpaRepository<MercenaryApplication, Long> {

}
