// src/main/java/com/example/backend/service/UserService.java
package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.dto.user.UserSignUpRequestDto;
import com.example.backend.dto.user.UserProfileUpdateDto;
import com.example.backend.dto.user.UserResponseDto;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.DuplicateException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 1. 회원가입
    public UserResponseDto signUp(UserSignUpRequestDto signUpDto) {
        if (userRepository.existsByEmail(signUpDto.getEmail())) {
            throw new DuplicateException("이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByUserid(signUpDto.getUserid())) {
            throw new DuplicateException("이미 사용 중인 아이디입니다.");
        }

        String encodedPassword = passwordEncoder.encode(signUpDto.getPassword());

        User user = User.builder()
                .name(signUpDto.getName())
                .email(signUpDto.getEmail())
                .userid(signUpDto.getUserid())
                .password(encodedPassword)
                .role("USER")
                .isExPlayer(signUpDto.getIsExPlayer() != null ? signUpDto.getIsExPlayer() : false)
                .region(signUpDto.getRegion())
                .preferredPosition(signUpDto.getPreferredPosition())
                .phoneNumber(signUpDto.getPhoneNumber())
                .build();

        User savedUser = userRepository.save(user);
        return UserResponseDto.fromEntity(savedUser);
    }

    // 2. 전체 사용자 조회 (관리자용 또는 개발용)
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 3. 사용자 정보 조회 (by id)
    public UserResponseDto getUserProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        return UserResponseDto.fromEntity(user);
    }

    // 4. 사용자 정보 수정
    public UserResponseDto updateProfile(Long id, UserProfileUpdateDto updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        Optional.ofNullable(updateDto.getName()).ifPresent(user::setName);
        Optional.ofNullable(updateDto.getEmail()).ifPresent(email -> {
            if (!user.getEmail().equals(email) && userRepository.existsByEmail(email)) {
                throw new DuplicateException("이미 사용 중인 이메일입니다.");
            }
            user.setEmail(email);
        });
        Optional.ofNullable(updateDto.getPassword()).ifPresent(newPassword -> {
            user.setPassword(passwordEncoder.encode(newPassword));
        });
        Optional.ofNullable(updateDto.getIsExPlayer()).ifPresent(user::setIsExPlayer);
        Optional.ofNullable(updateDto.getRegion()).ifPresent(user::setRegion);
        Optional.ofNullable(updateDto.getPreferredPosition()).ifPresent(user::setPreferredPosition);
        Optional.ofNullable(updateDto.getPhoneNumber()).ifPresent(user::setPhoneNumber);
        Optional.ofNullable(updateDto.getActivityStartDate()).ifPresent(user::setActivityStartDate);
        Optional.ofNullable(updateDto.getActivityEndDate()).ifPresent(user::setActivityEndDate);
        Optional.ofNullable(updateDto.getBirthDate()).ifPresent(user::setBirthDate);

        User updatedUser = userRepository.save(user);
        return UserResponseDto.fromEntity(updatedUser);
    }

    // 5. 사용자 삭제
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("삭제할 사용자를 찾을 수 없습니다.");
        }
        userRepository.deleteById(id);
    }

    // --- UserController에서 사용되는 추가 메서드 ---

    // 6. 사용자 정보 조회 (by userid) - /api/users/me 엔드포인트에서 사용
    public UserResponseDto getUserProfileByUserId(String userid) {
        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));
        return UserResponseDto.fromEntity(user);
    }

    // 7. 사용자 정보 수정 (by userid) - /api/users/me 엔드포인트에서 사용
    @Transactional // 해당 메서드에만 트랜잭션 필요
    public UserResponseDto updateProfileByUserId(String userid, UserProfileUpdateDto updateDto) {
        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다."));

        // DTO의 필드 값으로 엔티티 업데이트 (null이 아닌 필드만 업데이트)
        Optional.ofNullable(updateDto.getName()).ifPresent(user::setName);
        Optional.ofNullable(updateDto.getEmail()).ifPresent(email -> {
            if (!user.getEmail().equals(email) && userRepository.existsByEmail(email)) {
                throw new DuplicateException("이미 사용 중인 이메일입니다.");
            }
            user.setEmail(email);
        });
        Optional.ofNullable(updateDto.getPassword()).ifPresent(newPassword -> {
            user.setPassword(passwordEncoder.encode(newPassword));
        });
        Optional.ofNullable(updateDto.getIsExPlayer()).ifPresent(user::setIsExPlayer);
        Optional.ofNullable(updateDto.getRegion()).ifPresent(user::setRegion);
        Optional.ofNullable(updateDto.getPreferredPosition()).ifPresent(user::setPreferredPosition);
        Optional.ofNullable(updateDto.getPhoneNumber()).ifPresent(user::setPhoneNumber);
        Optional.ofNullable(updateDto.getActivityStartDate()).ifPresent(user::setActivityStartDate);
        Optional.ofNullable(updateDto.getActivityEndDate()).ifPresent(user::setActivityEndDate);
        Optional.ofNullable(updateDto.getBirthDate()).ifPresent(user::setBirthDate);

        // 변경 감지(Dirty Checking)로 자동 업데이트되지만, 명시적 저장은 DB 반영 시점을 확실히 함
        User updatedUser = userRepository.save(user);
        return UserResponseDto.fromEntity(updatedUser);
    }

    // 8. 사용자 삭제 (by userid) - /api/users/me 엔드포인트에서 사용
    public void deleteUserByUserId(String userid) {
        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new ResourceNotFoundException("삭제할 사용자를 찾을 수 없습니다."));
        userRepository.delete(user);
    }
}