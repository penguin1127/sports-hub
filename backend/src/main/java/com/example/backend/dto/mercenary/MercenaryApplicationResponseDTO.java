package com.example.backend.dto.mercenary;


import com.example.backend.entity.MercenaryApplication;

import java.time.LocalDateTime;

// 반환(응답)하는 DTO - 이 DTO의 값이 정상적으로 들어가게 되면 정삭적으로 들어갔다는 것을 알려주기 위해서임.
public class MercenaryApplicationResponseDTO {

    private Long id;
    private Long recruitPostId;
    private String position;
    private String message;
    private String status;
    private LocalDateTime applicationTime;

    public MercenaryApplicationResponseDTO(MercenaryApplication entity) { // 서비스에서 entity 값을 받음.
        this.id = entity.getId();
        this.recruitPostId = entity.getRecruitPostID().getId();
        this.position = entity.getPosition().name();
        this.message = entity.getMessage();
        this.status = entity.getStatus().name();
        this.applicationTime = entity.getApplicationTime();
    }
}
