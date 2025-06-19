// com/example/backend/dto/comment/CommentRequestDto.java
package com.example.backend.dto.comment;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDto {
    @NotEmpty(message = "댓글 내용이 비어있습니다.")
    private String content;
}