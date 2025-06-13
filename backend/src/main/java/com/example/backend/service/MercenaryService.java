package com.example.backend.service;

import com.example.backend.dto.mercenary.MercenaryApplicationResponseDTO;
import com.example.backend.dto.mercenary.UserMercenaryJoinRequestDto;
import com.example.backend.entity.MercenaryApplication;
import com.example.backend.entity.RecruitPost;
import com.example.backend.entity.User;
import com.example.backend.enums.ApplicationStatus;
import com.example.backend.enums.Position;
import com.example.backend.repository.MercenaryApplicationRepository;
import com.example.backend.repository.RecruitPostRepository;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

// 용병 신청을 처리하는 컨트롤러를 처리하는 서비스
@AllArgsConstructor
@Service
public class MercenaryService {

    final private UserRepository userRepository;
    final private RecruitPostRepository recruitPostRepository;
    final private MercenaryApplicationRepository applicationRepository;

    public MercenaryApplicationResponseDTO apply(UserMercenaryJoinRequestDto dto, String userName){
        User user = userRepository.findByUserid(userName).orElseThrow(() ->
                new RuntimeException("사용자를 찾을 수 없습니다."));// UserName 대신 Userid 사용함.

        RecruitPost post = recruitPostRepository.findById(dto.getRecruitPostId()).orElseThrow(() ->
                new RuntimeException("모집 공고가 존재하지 않습니다"));

        Position position = Position.valueOf(dto.getPosition()); // dto에 있던 position을 Enum 클래스인 Postion 타입에 대입

        MercenaryApplication entity = MercenaryApplication.builder() // MercenaryApplication 엔티티 클래스에 값을 대입함.
                .userID(user)
                .recruitPostID(post)
                .position(position)
                .message(dto.getMassage())
                .status(ApplicationStatus.PENDING)
                .build();

        applicationRepository.save(entity); // MercenaryApplication 클래스에 대입된 값을 db에 저장함.

        return new MercenaryApplicationResponseDTO(entity);
    }
}
