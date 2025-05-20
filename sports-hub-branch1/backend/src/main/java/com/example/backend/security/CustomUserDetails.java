package com.example.backend.security;

import com.example.backend.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

/**
 * Spring Security에서 인증된 사용자 정보를 나타내는 클래스입니다.
 */
@Getter
public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    /**
     * 사용자의 권한 정보를 반환합니다.
     * 일반적으로 role 필드를 기반으로 생성합니다.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * 사용자명을 반환합니다. 여기서는 userid를 기준으로 합니다.
     */
    @Override
    public String getUsername() {
        return user.getUserid();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 필요시 DB 필드와 연동 가능
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 필요시 DB 필드와 연동 가능
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 필요시 DB 필드와 연동 가능
    }

    @Override
    public boolean isEnabled() {
        return true; // 필요시 DB 필드와 연동 가능
    }
}
