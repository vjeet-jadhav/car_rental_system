package com.carrental.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.config.JwtUtils;
import com.carrental.dto.UserLoginRequestDto;
import com.carrental.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	
	private final UserService userService;
	private JwtUtils jwtUtil;
	
	@PostMapping("/login")
	public String userLogin(@RequestBody UserLoginRequestDto dto)
	{
		System.out.println(dto.toString());
		return jwtUtil.generateToken(dto.getEmail()); 
	}
}
