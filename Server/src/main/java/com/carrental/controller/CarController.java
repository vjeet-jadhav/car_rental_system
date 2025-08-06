// CarController.java - placeholder
package com.carrental.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.dto.CarRegistrationDTO;
import com.carrental.service.CarServiceImpl;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/car")
@AllArgsConstructor

public class CarController {

	private final CarServiceImpl carService;
	
	@PostMapping("/validate")
	public ResponseEntity<?> validateCar(@RequestBody String rcNumber)
	{
		System.out.println("CarController ke validateCar ke under hu padul saheb...");
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(carService.validateCar(rcNumber));
	}
	
	
	@PostMapping("/registration")
	public ResponseEntity<?> registerCar(@RequestBody @Valid CarRegistrationDTO car)
	{
		System.out.println("CarController ke registerCar ke under hu padul saheb...");
		Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(carService.registerCar(userId, car));
	}
	
	
	@PutMapping("/update")
	public ResponseEntity<?> updateCar(@RequestBody @Valid CarRegistrationDTO car)
	{
		System.out.println("CarController ke updateCar ke under hu padul saheb...");
		return ResponseEntity.status(HttpStatus.OK)
				.body(carService.updateCar(car));
	}
	
	@GetMapping("/ratings")
	public ResponseEntity<?> getRatings(@PathVariable Long carId)
	{
		System.out.println("CarController ke getRatings ke under hu padul saheb...");
		return ResponseEntity.status(HttpStatus.OK)
				.body(carService.getRatings(carId));
	}
}
