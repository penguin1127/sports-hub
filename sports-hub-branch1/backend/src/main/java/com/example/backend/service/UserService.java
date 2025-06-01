// src/main/java/com/example/backend/service/UserService.java
package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.dto.user.UserSignUpRequestDto;
import com.example.backend.dto.user.UserProfileUpdateDto;
import com.example.backend.dto.user.UserResponseDto;
import com.example.backend.dto.user.PublicUserProfileResponseDto; // ✅ 추가: 공개 프로필 DTO 임포트
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
@Transactional // 클래스 레벨에 @Transactional 추가 (메서드별로도 가능)
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
                .role("USER") // 기본 역할
                .isExPlayer(signUpDto.getIsExPlayer() != null ? signUpDto.getIsExPlayer() : false)
                .region(signUpDto.getRegion())
                .preferredPosition(signUpDto.getPreferredPosition())
                .phoneNumber(signUpDto.getPhoneNumber())
                // User 엔티티의 birthDate, activityStartDate, activityEndDate도 signUpDto에서 받아 설정
                // .birthDate(signUpDto.getBirthDate()) // DTO에 해당 필드 추가 필요
                // .activityStartDate(signUpDto.getActivityStartDate()) // DTO에 해당 필드 추가 필요
                // .activityEndDate(signUpDto.getActivityEndDate()) // DTO에 해당 필드 추가 필요
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

    // 3. 사용자 정보 조회 (by id - 상세 정보)
    // 이 메소드는 본인 또는 관리자만 접근 가능하도록 추후 권한 설정 필요
    public UserResponseDto getUserProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다. ID: " + id));
        return UserResponseDto.fromEntity(user);
    }

    // ✅ 3-1. 다른 사용자의 공개 프로필 정보 조회 (by id)
    public PublicUserProfileResponseDto getPublicUserProfileById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다. ID: " + userId));
        return PublicUserProfileResponseDto.fromEntity(user);
    }


    // 4. 사용자 정보 수정 (by id - 보통 관리자가 사용)
    public UserResponseDto updateProfile(Long id, UserProfileUpdateDto updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다. ID: " + id));

        // DTO의 필드 값으로 엔티티 업데이트 (null이 아닌 필드만 업데이트)
        updateUserFromDto(user, updateDto); // 중복 로직 추출

        User updatedUser = userRepository.save(user);
        return UserResponseDto.fromEntity(updatedUser);
    }

    // 5. 사용자 삭제 (by id - 보통 관리자가 사용)
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("삭제할 사용자를 찾을 수 없습니다. ID: " + id);
        }
        userRepository.deleteById(id);
    }

    // --- UserController의 /me 엔드포인트에서 사용되는 메서드들 ---

    // 6. 내 정보 조회 (by userid - 현재 로그인한 사용자)
    public UserResponseDto getUserProfileByUserId(String userid) {
        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다. UserID: " + userid));
        return UserResponseDto.fromEntity(user);
    }

    // 7. 내 정보 수정 (by userid - 현재 로그인한 사용자)
    public UserResponseDto updateProfileByUserId(String userid, UserProfileUpdateDto updateDto) {
        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다. UserID: " + userid));

        updateUserFromDto(user, updateDto); // 중복 로직 추출

        User updatedUser = userRepository.save(user);
        return UserResponseDto.fromEntity(updatedUser);
    }

    // 8. 내 계정 삭제 (탈퇴 - by userid)
    public void deleteUserByUserId(String userid) {
        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new ResourceNotFoundException("삭제할 사용자를 찾을 수 없습니다. UserID: " + userid));
        userRepository.delete(user);
    }

    // --- Helper method to update user entity from DTO ---
    private void updateUserFromDto(User user, UserProfileUpdateDto updateDto) {
        Optional.ofNullable(updateDto.getName()).ifPresent(user::setName);
        Optional.ofNullable(updateDto.getEmail()).ifPresent(email -> {
            if (!user.getEmail().equals(email) && userRepository.existsByEmail(email)) {
                throw new DuplicateException("이미 사용 중인 이메일입니다.");
            }
            user.setEmail(email);
        });
        // 비밀번호 변경은 별도의 API와 로직으로 처리하는 것이 일반적이므로,
        // 프로필 수정에서 비밀번호 필드는 신중하게 다루거나 제외하는 것을 고려.
        // 만약 포함한다면, 빈 문자열이 아닐 때만 업데이트하도록 조건 추가.
        if (updateDto.getPassword() != null && !updateDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updateDto.getPassword()));
        }
        Optional.ofNullable(updateDto.getIsExPlayer()).ifPresent(user::setIsExPlayer);
        Optional.ofNullable(updateDto.getRegion()).ifPresent(user::setRegion);
        Optional.ofNullable(updateDto.getPreferredPosition()).ifPresent(user::setPreferredPosition);
        Optional.ofNullable(updateDto.getPhoneNumber()).ifPresent(user::setPhoneNumber);
        Optional.ofNullable(updateDto.getActivityStartDate()).ifPresent(user::setActivityStartDate);
        Optional.ofNullable(updateDto.getActivityEndDate()).ifPresent(user::setActivityEndDate);
        Optional.ofNullable(updateDto.getBirthDate()).ifPresent(user::setBirthDate);
    }
}