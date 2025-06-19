package com.example.backend.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.token-validity-in-ms}")
    private long tokenValidityInMs;

    private Key signingKey;

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public void setTokenValidityInMs(long tokenValidityInMs) {
        this.tokenValidityInMs = tokenValidityInMs;
    }

    @PostConstruct
    protected void init() {
        byte[] keyBytes = Base64.getEncoder().encode(secretKey.getBytes());
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 토큰 생성 (userid, role 정보 기반)
     */
    public String generateToken(String userid, String role) {
        Claims claims = Jwts.claims().setSubject(userid);
        claims.put("role", role);

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + tokenValidityInMs);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 토큰에서 인증 정보 조회
     */
    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);

        String userid = claims.getSubject();
        String role = (String) claims.get("role");

        return new UsernamePasswordAuthenticationToken(
                userid,
                null,
                List.of(new SimpleGrantedAuthority(role))
        );
    }

    /**
     * Request Header에서 토큰 추출
     */
    public String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }

    /**
     * 토큰 유효성 검사
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.error("❌ [JWT] 잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.error("❌ [JWT] 만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.error("❌ [JWT] 지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.error("❌ [JWT] JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    /**
     * 토큰에서 Claims 정보 추출
     */
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
