package com.carrental.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.entity.User;
import com.carrental.service.HostService;
import com.carrental.service.HostServiceImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/host")
@AllArgsConstructor
public class HostController {

	private final HostService hostService;
	
	@GetMapping()
	public ResponseEntity<?> getMyCars()
	{
		Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		System.out.println("HostController ke getMycars ke under hu padul saheb...");
		//calling service method
		return ResponseEntity.status(HttpStatus.OK)
				.body(hostService.getMyCars(userId));
	}
	
	@GetMapping("/earning")
	public ResponseEntity<?> getTotalEarnings(){
		Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		System.out.println(id);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(hostService.getTotalEarnings(id));
	}
	
}
