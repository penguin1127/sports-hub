// com/example/backend/entity/TeamPostLike.java
package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

// com/example/backend/entity/TeamPostLike.java

@Entity
@Table(name = "team_post_likes")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(TeamPostLikeId.class) // 복합키 클래스 지정
public class TeamPostLike {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private TeamPost post;
}