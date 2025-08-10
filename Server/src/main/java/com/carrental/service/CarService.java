package com.carrental.service;

import com.carrental.dto.ApiResponse;
import com.carrental.dto.ApiResponseWithId;
import com.carrental.dto.CarRegistrationDTO;
import com.carrental.dto.RcValidationResponce;

import jakarta.validation.Valid;

public interface CarService {
	
	public RcValidationResponce<CarRegistrationDTO> validateCar(String rcNumber);
	
	public ApiResponseWithId registerCar(Long userId, @Valid CarRegistrationDTO car);
	
	public ApiResponse updateCar(@Valid CarRegistrationDTO car);

	public Object getRatings(Long carId);

	public Object getBookingsDetails(Long carId);
}
