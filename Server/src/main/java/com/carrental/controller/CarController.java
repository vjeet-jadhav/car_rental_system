// CarController.java - placeholder
package com.carrental.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.dto.CarRegistrationDTO;
import com.carrental.dto.RcValidationResponce;
import com.carrental.service.CarService;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/car")
@AllArgsConstructor

public class CarController {

	private final CarService carService;
	
	@PostMapping("/validate")
    public ResponseEntity<RcValidationResponce<CarRegistrationDTO>> validate(@RequestBody Map<String,String> body) 
	{
		System.out.println("CarController ke validate ke under hu padul saheb...");
		
        String rcNumber = body.get("rcNumber");
        
        RcValidationResponce<CarRegistrationDTO> resp = carService.validateCar(rcNumber);
        
        System.out.println(resp.getStatus());
        
        HttpStatus status = resp.getStatus().equals("success")
                          ? HttpStatus.OK
                          : HttpStatus.BAD_REQUEST;
                          
        return ResponseEntity.status(status).body(resp);
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
	
	@GetMapping("/ratings/{carId}")
	public ResponseEntity<?> getRatings(@PathVariable Long carId)
	{
		System.out.println("CarController ke getRatings ke under hu padul saheb...");
		return ResponseEntity.status(HttpStatus.OK)
				.body(carService.getRatings(carId));
	}
	
	
	@GetMapping("/bookings/{carId}")
	public ResponseEntity<?> getBookingsDetails(@PathVariable Long carId)
	{
		System.out.println("CarController ke getBookingsDetails ke under hu padul saheb...");
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(carService.getBookingsDetails(carId));
	}
}
