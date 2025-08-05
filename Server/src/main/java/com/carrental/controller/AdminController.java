package com.carrental.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.dto.RegisterAgentDTO;
import com.carrental.dto.UserResponseDto;
import com.carrental.entity.UserRole;
import com.carrental.service.AdminService;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminController {
	
	private final AdminService adminService;
	private final ModelMapper mapper;
	
	
	//register agent
	@PostMapping("/register")
	@Operation(description = "register new agent")
	public ResponseEntity<?> registerAgent(@RequestBody @Valid RegisterAgentDTO dto){
//		System.out.println(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.register(dto));
	}
	
	@GetMapping("/get-agents")
	public ResponseEntity<?>  getAgents(){
		
		List<UserResponseDto> agents = adminService.getAgents();
		
		if(agents.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		
		return ResponseEntity.ok(agents);		
		
	}
	
	@PutMapping("/assign-agent/{carId}/{agentId}")
	public ResponseEntity<?> assignAgent(@PathVariable Long carId, @PathVariable Long agentId ){
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(adminService.assignAgentToCar(carId, agentId));
	}
	
	@GetMapping("/getinfo")
	public ResponseEntity<?> getAllInfo(){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.getBasicInfo());
	}

}
