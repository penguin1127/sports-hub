// src/main/java/com/example/backend/exception/UnauthorizedException.java
package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * 권한이 없는 작업을 시도했을 때 발생하는 예외
 * HTTP 403 Forbidden 상태 코드 반환
 */
@ResponseStatus(HttpStatus.FORBIDDEN) // HTTP 403 상태 코드 반환
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}