// src/main/java/com/example/backend/entity/UserTeamId.java
package com.example.backend.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * UserTeam 엔티티의 복합키를 위한 임베디드 ID 클래스
 */
@Embeddable // 임베디드 타입으로 지정
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode // 복합 키이므로 equals와 hashCode 구현 필수
public class UserTeamId implements Serializable { // Serializable 구현 필수
    private Long userId;
    private Long teamId;
}