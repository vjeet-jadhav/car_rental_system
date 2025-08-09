package com.carrental.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.dto.CarSheduleDTO;
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
	
	
	@PutMapping("/shedule-car/{carId}")
	public ResponseEntity<?> sheduleCar(@PathVariable Long carId,@RequestBody CarSheduleDTO carShedule)
	{
		System.out.println("HostController ke sheduleCar ke under hu padul saheb...");
		return ResponseEntity.status(HttpStatus.OK)
				.body(hostService.sheduleCar(carId,carShedule));
	}
	
	
	@PutMapping("/unschedule-car/{carId}")
	public ResponseEntity<?> unsheduleCar(@PathVariable Long carId)
	{
		System.out.println("HostController ke unsheduleCar ke under hu padul saheb...");
		return ResponseEntity.status(HttpStatus.OK)
				.body(hostService.unsheduleCar(carId));
	}
	
	
	@GetMapping("/get-booking-history")
	public ResponseEntity<?> getBookingHistory()
	{
		Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		System.out.println(userId);
		System.out.println("HostController ke getBookingHistory ke under hu padul saheb...");
		return ResponseEntity.status(HttpStatus.OK)
				.body(hostService.getBookingHistory(userId));
	}
	

}
