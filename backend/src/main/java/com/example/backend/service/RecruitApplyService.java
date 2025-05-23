package com.example.backend.service;

import com.example.backend.dto.RecruitApplyDTO;
import com.example.backend.entity.RecruitApplication;
import com.example.backend.entity.RecruitPost;
import com.example.backend.entity.User;
import com.example.backend.repository.RecruitApplicationRepository;
import com.example.backend.repository.RecruitPostRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // 기본 생성자
public class RecruitApplyService {

    private final RecruitApplicationRepository recruitApplicationRepository;
    private final UserRepository userRepository;

    public void apply(RecruitApplyDTO dto){ // 신청을 했다는 것을 저장할 테이블이 필요함, 이름 등이 들어옴
        //Entity 클래스에 dto 객체를 대입함
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자 정보가 없습니다."));

        // service(여기)에서 Entity 생성
       RecruitApplication application = RecruitApplication.builder() // 신청 대기 클래스에 유저 외래키, 자기소개, 신청 날짜 값들을 대입함, 참고로 builder()는 정적이므로 new 키워드 x
               .user(user)
               .description(dto.getDescription())
               .applicationDate(dto.getApplicationDate())
               .build();

        //리포지토리에서 저장함.
        recruitApplicationRepository.save(application);
    }
}
