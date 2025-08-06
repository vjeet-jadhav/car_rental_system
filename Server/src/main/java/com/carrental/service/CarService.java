package com.carrental.service;

import com.carrental.dto.ApiResponse;
import com.carrental.dto.CarRegistrationDTO;

import jakarta.validation.Valid;

public interface CarService {
	
	public CarRegistrationDTO validateCar(String rcNumber);
	
	public ApiResponse registerCar(Long userId, @Valid CarRegistrationDTO car);
	
	public ApiResponse updateCar(@Valid CarRegistrationDTO car);
}
