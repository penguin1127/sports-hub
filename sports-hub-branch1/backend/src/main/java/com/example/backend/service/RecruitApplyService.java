package com.example.backend.service;

import com.example.backend.dto.RecruitApplyDTO;
import com.example.backend.entity.RecruitApplication;
import com.example.backend.entity.RecruitPost;
import com.example.backend.repository.RecruitApplyRepository;
import com.example.backend.repository.RecruitPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // 기본 생성자
public class RecruitApplyService {

    private final RecruitPostRepository recruitPostRepository;

    public void apply(RecruitApplyDTO dto){ // 신청을 했다는 것을 저장할 테이블이 필요함, 이름 등이 들어옴
        //Entity 클래스에 dto 객체를 대입함
       RecruitApplication application = new RecruitApplication(); // 신청한 유저 이름, 생성자에다 대입,
        //리포지토리에서 저장함.
        recruitPostRepository.save(application);
    }
}
