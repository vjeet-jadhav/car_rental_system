// JwtUtils.java - placeholder
package com.carrental.config;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.carrental.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {
	
	@Value("${SECRET_KEY}")
	private String jwtSecret;
	
	@Value("${EXP_TIMEOUT}")
	private int jwtExpirationMs;
	
	private SecretKey key;
	
	public void init() {
		log.info("Key {} Exp Time {}",jwtSecret,jwtExpirationMs);
		
		//create a secrete key instance from its builder keys
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	public String generateJwtToken(Authentication authentication) {
		
		log.info("generate jwt token "+ authentication);  //contains verified user details
		
		User userPrincipal = (User) authentication.getPrincipal();
		return Jwts.builder()
				.subject(userPrincipal.getUsername())
				.issuedAt(new Date())
				.expiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.claim("authorities",getAuthoritiesInString(userPrincipal.getAuthorities()))
				.claim("id", userPrincipal.getId())
				.claim("fname", userPrincipal.getFirstName())
				.signWith(key, Jwts.SIG.HS256)
				.compact();

	}
	
	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}
	
	public Long getUserIdFromJwtToken(Claims claims) {
	    return claims.get("id", Long.class);
	}
	
	public String getFirstNameFromJwtToken(Claims claims) {
	    return claims.get("fname", String.class);
	}


	public Claims validateJwtToken(String jwtToken) {
		
		Claims claims = Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(jwtToken)
				.getPayload();
		
		return claims;
				
	}
    
	private List<String> getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities){
		return authorities.stream()
				.map(GrantedAuthority :: getAuthority)
				.collect(Collectors.toList());
	}
	
	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims){
		
		List<String> authorityNameFromJwt = (List<String>) claims.get("authorities");
		List<GrantedAuthority> authorities = authorityNameFromJwt
				.stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		
		return authorities;
	}
	
	public Authentication populateAuthenticationTokenFromJWT(String jwt) {
		
		Claims payloadClaims = validateJwtToken(jwt);
		String email = getUserNameFromJwtToken(payloadClaims);
		List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
		
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email,null, authorities);
		
		return token;
	}
	
}
