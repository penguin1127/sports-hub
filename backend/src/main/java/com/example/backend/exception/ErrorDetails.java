package com.example.backend.exception;

public class ErrorDetails extends RuntimeException {
  public ErrorDetails(String message) {
    super(message);
  }
}
