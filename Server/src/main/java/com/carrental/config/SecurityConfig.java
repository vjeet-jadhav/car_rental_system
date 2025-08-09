package com.carrental.config;

import java.util.List;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;


@Configuration         //to declare configuration class
@EnableWebSecurity     //to enable spring security
@EnableMethodSecurity  //to enable authentication rules at method level
@AllArgsConstructor 
public class SecurityConfig {

	private final CustomJWTFilter cutomJWTFilter;
	
	@Bean
	SecurityFilterChain configureFilterChain(HttpSecurity http) throws Exception{
		System.out.println("SecurityConfiguration ke ander hu..:)");
		
		http.csrf( csrf -> csrf.disable());
		
		http.cors().and();
		
		http.authorizeHttpRequests(
				request -> request 
				.requestMatchers(
						"/swagger-ui/**",
						"/v3/api-docs/**",
						"/user/signin", 
						"/user/signup").permitAll()
				.requestMatchers(HttpMethod.OPTIONS).permitAll()
				.requestMatchers(HttpMethod.GET, "/").permitAll()
				.requestMatchers(HttpMethod.GET, "/user/topCars").permitAll()
//				.requestMatchers(HttpMethod.POST,"/user/bookingCar").permitAll()
				// need to be protected for testing purpose user/signin
				.requestMatchers(HttpMethod.GET, "/user/getTopReviews").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/payment/create-order").permitAll()
				.requestMatchers(HttpMethod.POST, "/api/payment/verify").permitAll()
				.requestMatchers(HttpMethod.POST, "/user/serachCar").permitAll()
				.requestMatchers(HttpMethod.GET, "/user/getTop3Cars").permitAll()
				.requestMatchers(HttpMethod.GET, "/user/getCarServiceArea").permitAll()
				.requestMatchers(HttpMethod.POST, "/user/applyFilters").permitAll()
				.requestMatchers(HttpMethod.GET, "/user/getCarCity").permitAll()
				.requestMatchers(HttpMethod.POST,"/user/bookingCar").permitAll()
				.requestMatchers(HttpMethod.POST,"/user/upload/**").permitAll()
				.requestMatchers(HttpMethod.POST,"/user/uploadMul/**").permitAll()
				.requestMatchers(HttpMethod.GET, "/user/review/**").permitAll()
				.requestMatchers(HttpMethod.PUT,"/user/updateImg/**").permitAll()
				.requestMatchers(HttpMethod.GET,"/user/getNearByCars/**").permitAll()


				.requestMatchers(HttpMethod.GET,"/host").hasRole("HOST")
				.requestMatchers(HttpMethod.POST, "/car/validate").hasAnyRole("HOST","USER")
				.requestMatchers(HttpMethod.POST, "/car/registration").hasAnyRole("HOST","USER")
				.requestMatchers(HttpMethod.PUT, "/car/update").hasRole("HOST")
				.requestMatchers(HttpMethod.GET, "/user/review/**").permitAll()

				.requestMatchers(HttpMethod.GET, "/car/ratings").hasAnyRole("HOST", "USER")
				.requestMatchers(HttpMethod.GET, "/car/bookings").hasRole("HOST")
				.requestMatchers(HttpMethod.PUT, "/host/shedule-car/{carId}").hasRole("HOST")
				.requestMatchers(HttpMethod.PUT, "/host/unschedule-car/{carId}").hasRole("HOST")
				.requestMatchers(HttpMethod.GET, "/host/get-booking-history").hasRole("HOST")
				.requestMatchers(HttpMethod.GET, "/host/getcar/{carId}").hasRole("HOST")

				.requestMatchers(HttpMethod.POST,"/admin/register").hasRole("ADMIN")
				.requestMatchers(HttpMethod.GET,"/admin/getagents").hasRole("ADMIN")
				.requestMatchers(HttpMethod.PUT, "/admin/assignAgent/**").hasRole("ADMIN")
				.requestMatchers(HttpMethod.GET,"/admin/getAgents").hasRole("ADMIN")
				.requestMatchers(HttpMethod.GET,"/admin/getInfo").hasRole("ADMIN")
				.requestMatchers(HttpMethod.PUT,"/restrictCar/**").hasRole("ADMIN")
				.requestMatchers(HttpMethod.PUT,"/restrictUser/**").hasRole("ADMIN")
				.requestMatchers(HttpMethod.GET,"/admin/getPendingCars").hasRole("ADMIN")
				.requestMatchers(HttpMethod.GET,"/admin/getCarsInfo").hasRole("ADMIN")
				.requestMatchers(HttpMethod.GET,"/admin/getUserByEmail/**").hasRole("ADMIN")
				
				.requestMatchers(HttpMethod.GET, "/agent").hasRole("AGENT")
				.requestMatchers(HttpMethod.GET, "/agent/*").hasRole("AGENT")


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
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();
	    config.setAllowedOrigins(List.of("http://localhost:5173")); // your frontend origin
	    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(List.of("*"));
	    config.setAllowCredentials(true); // important if you're using cookies or Authorization header

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);
	    return source;
	}

	
}

