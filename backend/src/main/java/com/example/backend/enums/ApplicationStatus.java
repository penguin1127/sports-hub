// src/main/java/com/example/backend/enums/ApplicationStatus.java
package com.example.backend.enums;

/**
 * 모집 신청의 현재 상태
 */
public enum ApplicationStatus {
    PENDING,    // 대기중
    ACCEPTED,   // 수락됨
    REJECTED,   // 거절됨
    CANCELED    // 취소됨 (신청자에 의해 취소)
}