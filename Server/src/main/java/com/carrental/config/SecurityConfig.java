package com.carrental.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;


@Configuration         //to declare configuration class
@EnableWebSecurity     //to enable spring security
@EnableMethodSecurity  //to enable authentication rules at method level
@AllArgsConstructor 
public class SecurityConfig {

	private final CustomJWTFilter cutomJWTFilter;
	
	@Bean
	SecurityFilterChain configureFilterChain(HttpSecurity http) throws Exception{
		
		http.csrf( csrf -> csrf.disable());
		
		http.authorizeHttpRequests(
				request -> request 
				.requestMatchers(
						"/swagger-ui/**",
						"/v3/api-docs/**",
						"/user/signin", 
						"/user/signup").permitAll()
				.requestMatchers(HttpMethod.OPTIONS).permitAll()
				.requestMatchers(HttpMethod.GET, "/").permitAll()
				.requestMatchers(HttpMethod.POST,"/admin/register").hasRole("ADMIN")
				.requestMatchers(HttpMethod.GET,"/admin/getagents").hasRole("ADMIN")
				.anyRequest()
				.authenticated()
				);
		
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.formLogin(form -> form.disable());
		http.httpBasic(basic -> basic.disable());
		http.addFilterBefore(cutomJWTFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
	
	@Bean
	AuthenticationManager authenticationManager (AuthenticationConfiguration config) throws Exception {
		
		return config.getAuthenticationManager();
	}
	

	
}

