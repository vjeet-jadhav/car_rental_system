package com.carrental.controller;

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
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	public final UserServiceImpl userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> RegesterUser(@RequestBody @Valid UserRequestDto userDto) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.RegisterUser(userDto));
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<?> updateUserDetails(@PathVariable Long userId, @RequestBody UserUpdateRequestDto userDto){
		return ResponseEntity.ok(userService.updateUser(userId, userDto));
	}
}
