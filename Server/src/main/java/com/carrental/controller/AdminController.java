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

import com.carrental.dto.AgentResDTO;
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
	
	@GetMapping("/getAgents")
	public ResponseEntity<?>  getAgents(){
		
		List<AgentResDTO> agents = adminService.getAgents();
		
		if(agents.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		
		return ResponseEntity.ok(agents);		
		
	}
	
	@PutMapping("/assignAgent/{carId}/{agentId}")
	public ResponseEntity<?> assignAgent(@PathVariable Long carId, @PathVariable Long agentId ){
		System.out.println(carId+agentId);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(adminService.assignAgentToCar(carId, agentId));
	}
	
	@GetMapping("/getInfo")
	public ResponseEntity<?> getAllInfo(){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.getBasicInfo());
	}
	
	@PutMapping("/restrictCar/{carId}")
	public ResponseEntity<?> restrictCar(@PathVariable Long carId){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.restrictCarById(carId));
		
	}
	
	@PutMapping("/restrictUser/{userId}/{remark}")
	public ResponseEntity<?> restrictUser(@PathVariable Long userId, @PathVariable String remark){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.restrictUserById(userId,remark));
		
	}
	
	@GetMapping("/getPendingCars")
	public ResponseEntity<?> getPendingCars(){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.getPendingCars());
	}
	
	@GetMapping("/getCarsInfo")           //get cars with rating and total bookings 
	public ResponseEntity<?> getCarsInfo(){
		
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.getEntireCarInfo());
	}
	
	@GetMapping("/getUserByEmail/{email}")
	public ResponseEntity<?> getUserByEmail(@PathVariable String email){
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.getUserByEmail(email));
	}

}
