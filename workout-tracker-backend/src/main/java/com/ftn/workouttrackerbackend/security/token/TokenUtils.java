package com.ftn.workouttrackerbackend.security.token;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenUtils {

    @Value("${app.name}")
    private String APPLICATION_NAME;

    @Value("${token.secret}")
    public String TOKEN_SECRET;

    @Value("${token.access.duration}")
    private long ACCESS_TOKEN_DURATION;

    @Value("${token.refresh.duration}")
    private long REFRESH_TOKEN_DURATION;

    private SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS512;

    public String generateAccessToken(UserDetails userDetails) {
        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + ACCESS_TOKEN_DURATION);
        return Jwts.builder()
                .setIssuer(APPLICATION_NAME)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiresAt)
                .claim("role", userDetails.getAuthorities().toString().substring(1, userDetails.getAuthorities().toString().length()-1))
                .signWith(SIGNATURE_ALGORITHM, TOKEN_SECRET).compact();
    }



    public String generateRefreshToken(UserDetails userDetails) {
        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + REFRESH_TOKEN_DURATION);
        return Jwts.builder()
                .setIssuer(APPLICATION_NAME)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiresAt)
                .signWith(SIGNATURE_ALGORITHM, TOKEN_SECRET).compact();
    }

    public String getToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        return null;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = this.getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(TOKEN_SECRET)
                    .requireIssuer(APPLICATION_NAME)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    public String getUsernameFromToken(String token) {
        String username;
        try {
            final Claims claims = this.getAllClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    public Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            final Claims claims = this.getAllClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

}
