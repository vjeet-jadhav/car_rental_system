package com.carrental.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.dto.RegisterAgentDTO;
import com.carrental.service.AdminService;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminController {
	
	private AdminService adminService;
	
	
	//register agent
	@PostMapping("/register")
	@Operation(description = "register new agent")
	public ResponseEntity<?> registerAgent(@RequestBody @Valid RegisterAgentDTO dto){
//		System.out.println(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.register(dto));
	}

}
