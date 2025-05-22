// src/main/java/com/example/backend/exception/DuplicateException.java
package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT) // HTTP 409 상태 코드 반환
public class DuplicateException extends RuntimeException {
    public DuplicateException(String message) {
        super(message);
    }
}