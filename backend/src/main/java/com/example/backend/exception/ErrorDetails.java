// src/main/java/com/example/backend/exception/ErrorDetails.java
package com.example.backend.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDetails {
    private LocalDateTime timestamp;
    private String message;
    private String details;
    private int status;
    private Map<String, String> errors; // 유효성 검사 오류 등 추가 정보

    public ErrorDetails(LocalDateTime timestamp, String message, String details, int status) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
        this.status = status;
    }
}