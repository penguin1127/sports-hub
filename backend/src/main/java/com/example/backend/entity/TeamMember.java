package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Table(name = "team_member")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TeamMember {
    @Id
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team teamId;

    @OneToOne // 팀을 한번에 하나씩만 가질 수 있다는 가정하에 사용
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "joined_at") // 가입 일자
    private Date joinedAt;

    @Column(name = "is_active") // 가입된 상태인지 탈퇴한 상태인지 파악할 때 사용(팀 가입 기록을 보존하는 용도로도 사용함)
    private Boolean isActive;

}
