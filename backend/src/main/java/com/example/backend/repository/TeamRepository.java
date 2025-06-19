// src/main/java/com/example/backend/repository/TeamRepository.java
package com.example.backend.repository;

import com.example.backend.entity.Team;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // List import 추가
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    Optional<Team> findByName(String name);
    List<Team> findByCaptain(User captain);
}