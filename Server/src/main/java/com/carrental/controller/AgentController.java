package com.carrental.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.carrental.CarRentalApplication;
import com.carrental.service.AgentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/agent")
@AllArgsConstructor
public class AgentController {

	private AgentService agentService;
	
	@GetMapping
	public ResponseEntity<?> getAgentVerificationList(){
		System.out.println("In The Agent Controller GetAgentVerificationList");
		Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		System.out.println(id);
		return ResponseEntity.ok(agentService.
				getAgentVerificationList(id));
	}
	
	@GetMapping("/history")
	public ResponseEntity<?> getAgentHistory(){
		System.out.println("Inside GetHistory of Agent!");
		Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		System.out.println(id);
		return ResponseEntity.ok(agentService
				.getAgentHistory(id));
	}
	
	@PutMapping("/{carId}/verify")
	public ResponseEntity<?> verifyCar(@PathVariable Long carId ){
		System.out.println(carId);
		agentService.verifyCar(carId , "VERIFIED");
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/{carId}/reject")
	public ResponseEntity<?> rejectCar(@PathVariable Long carId ){
		System.out.println(carId);
		agentService.rejectcar(carId);
		return ResponseEntity.noContent().build();
	}
	
}
