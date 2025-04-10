package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * User 엔티티에 대한 CRUD 및 사용자 이름을 통한 조회 기능 제공.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * username을 기반으로 사용자 정보를 조회.
     * @param username 사용자 이름
     * @return 사용자 정보를 Optional로 반환
     */
    Optional<User> findByUsername(String username);

    /**
     * 해당 username이 이미 존재하는지 확인.
     * @param username 사용자 이름
     * @return 존재하면 true, 아니면 false
     */
    boolean existsByUsername(String username);
}
