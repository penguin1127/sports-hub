// src/main/java/com/example/backend/exception/GlobalExceptionHandler.java
package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 전역 예외 처리 핸들러
 */
@ControllerAdvice // 모든 컨트롤러에 적용되는 어드바이스
public class GlobalExceptionHandler {

    // 1. ResourceNotFoundException 처리 (HTTP 404 Not Found)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                ex.getMessage(),
                request.getDescription(false),
                HttpStatus.NOT_FOUND.value()
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    // 2. UnauthorizedException 처리 (HTTP 403 Forbidden)
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorDetails> handleUnauthorizedException(UnauthorizedException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                ex.getMessage(),
                request.getDescription(false),
                HttpStatus.FORBIDDEN.value()
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.FORBIDDEN);
    }

    // 3. DuplicateException 처리 (HTTP 409 Conflict)
    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<ErrorDetails> handleDuplicateException(DuplicateException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                ex.getMessage(),
                request.getDescription(false),
                HttpStatus.CONFLICT.value()
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    // 4. @Valid 어노테이션으로 인한 유효성 검사 실패 처리 (HTTP 400 Bad Request)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                "유효성 검사 실패",
                request.getDescription(false),
                HttpStatus.BAD_REQUEST.value(),
                errors // 유효성 검사 오류 세부 정보 추가
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    // 5. 기타 모든 예외 처리 (Generic Exception Handler - HTTP 500 Internal Server Error)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobalException(Exception ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", // 사용자에게 친화적인 메시지
                request.getDescription(false),
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        // 실제 운영 환경에서는 로그를 통해 스택 트레이스를 기록해야 합니다.
        // log.error("Unhandled exception: ", ex);
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}