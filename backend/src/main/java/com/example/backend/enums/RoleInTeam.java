// src/main/java/com/example/backend/enums/RoleInTeam.java
package com.example.backend.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 팀 내 사용자 역할 ENUM
 */
@Getter
@RequiredArgsConstructor
public enum RoleInTeam {
    LEADER("LEADER", "팀 리더"),
    MEMBER("MEMBER", "일반 멤버"),
    // 추가적인 역할이 있다면 여기에 정의할 수 있습니다. (예: CO_LEADER, SUB_MEMBER 등)
    ;

    private final String key;
    private final String title;
}