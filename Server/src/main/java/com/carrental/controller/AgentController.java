package com.carrental.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.carrental.CarRentalApplication;
import com.carrental.service.AgentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/agent")
@AllArgsConstructor
public class AgentController {

    private final CarRentalApplication carRentalApplication;
	private AgentService agentService;

    AgentController(CarRentalApplication carRentalApplication) {
        this.carRentalApplication = carRentalApplication;
    }
	
//	@GetMapping
//	public ResponseEntity<?> getAgentVerificationList(){
//		return 
//	}
//	
	@GetMapping("/history")
	public ResponseEntity<?> getAgentHistory(){
		System.out.println("Inside GetHistory of Agent!");
		return ResponseEntity.ok(agentService
				.getAgentHistory());
	}
}
