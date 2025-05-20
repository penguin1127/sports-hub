package com.example.backend.security;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Spring Security에서 사용자 인증을 위한 사용자 정보를 로드하는 서비스입니다.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 주어진 userid로 사용자 정보를 로드합니다.
     *
     * @param userid 로그인 시도한 사용자의 아이디
     * @return UserDetails 사용자 정보
     * @throws UsernameNotFoundException 아이디에 해당하는 사용자가 없는 경우 예외 발생
     */
    @Override
    public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with userid: " + userid));
        return new CustomUserDetails(user);
    }
}
