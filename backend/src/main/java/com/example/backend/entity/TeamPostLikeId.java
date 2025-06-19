// com/example/backend/entity/TeamPostLikeId.java
package com.example.backend.entity;

import jakarta.persistence.Embeddable;
import lombok.*;
import java.io.Serializable;

@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TeamPostLikeId implements Serializable {
    private Long user; // userId -> user
    private Long post; // postId -> post
}