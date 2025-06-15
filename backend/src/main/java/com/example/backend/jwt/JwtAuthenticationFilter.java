package com.example.backend.jwt;

import com.example.backend.security.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT 인증 필터: 모든 요청마다 실행되며,
 * Authorization 헤더에 유효한 JWT 토큰이 있으면 인증된 사용자로 SecurityContext에 등록합니다.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 인증 API는 제외
        String path = request.getRequestURI();
        logger.info("✅ [FILTER] 요청 수신: {}", path);

        if (path.startsWith("/api/auth")) {
            logger.info("✅ [FILTER] 인증 API 경로이므로 필터를 통과합니다.");
            filterChain.doFilter(request, response);
            return;
        }

        // 헤더에서 토큰 추출
        String token = jwtTokenProvider.resolveToken(request);

        if (token == null) {
            logger.warn("✅ [FILTER] Authorization 헤더에 Bearer 토큰이 없습니다.");
        }

        // 토큰 유효 시 인증 정보 저장
        if (token != null && jwtTokenProvider.validateToken(token)) {
            logger.info("✅ [FILTER] 토큰 유효성 검사 통과.");
            try {
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                String userid = authentication.getName();
                logger.info("✅ [FILTER] 토큰에서 사용자 ID 추출: {}", userid);

                UserDetails userDetails = userDetailsService.loadUserByUsername(userid);
                logger.info("✅ [FILTER] DB에서 사용자 정보 조회 성공. 사용자: {}", userDetails.getUsername());

                var authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                logger.info("✅ [FILTER] SecurityContext에 인증 정보 저장 완료.");

            } catch (UsernameNotFoundException e) {
                logger.error("❌ [FILTER] 토큰의 사용자 ID로 DB에서 사용자를 찾을 수 없습니다.", e);
            } catch (Exception e) {
                logger.error("❌ [FILTER] 인증 정보 설정 중 알 수 없는 오류 발생", e);
            }
        } else {
            logger.warn("✅ [FILTER] 유효한 JWT 토큰이 없습니다.");
        }

        filterChain.doFilter(request, response);
    }
}