package com.carrental.controller;

<<<<<<< HEAD
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.config.JwtUtils;
import com.carrental.dto.UserLoginRequestDto;
import com.carrental.service.UserService;

=======
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserUpdateRequestDto;
import com.carrental.service.UserServiceImpl;

import jakarta.validation.Valid;
>>>>>>> fb1c593c6c315a11c83400a6a02e8909e02539ce
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
<<<<<<< HEAD
	
	private final UserService userService;
	private JwtUtils jwtUtil;
	
	@PostMapping("/login")
	public String userLogin(@RequestBody UserLoginRequestDto dto)
	{
		System.out.println(dto.toString());
		return jwtUtil.generateToken(dto.getEmail()); 
=======
	public final UserServiceImpl userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> RegesterUser(@RequestBody @Valid UserRequestDto userDto) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.RegisterUser(userDto));
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<?> updateUserDetails(@PathVariable Long userId, @RequestBody UserUpdateRequestDto userDto){
		return ResponseEntity.ok(userService.updateUser(userId, userDto));
>>>>>>> fb1c593c6c315a11c83400a6a02e8909e02539ce
	}
}
