package com.carrental.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.entity.User;
import com.carrental.service.HostServiceImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/host")
@AllArgsConstructor
public class HostController {

	private final HostServiceImpl hostService;
	
	@GetMapping("/become-host/{userId}")
	public ResponseEntity<?> getMyCars(@PathVariable Long userId)
	{
		//calling service method
		return ResponseEntity.status(HttpStatus.OK)
				.body(hostService.getMyCars(userId));
	}
}
