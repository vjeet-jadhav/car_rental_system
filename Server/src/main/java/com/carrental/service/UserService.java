package com.carrental.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.carrental.dto.ApiResponse;
import com.carrental.dto.CarFilterRequestDto;
import com.carrental.dto.CarPaymentDto;
import com.carrental.dto.TopCarsResponseDto;

import com.carrental.dto.CarReviewDto;

import com.carrental.dto.UserBookingsDto;
import com.carrental.dto.UserCarBookingDto;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserResponseDto;
import com.carrental.dto.UserUpdateRequestDto;


public interface UserService {

	UserResponseDto RegisterUser(UserRequestDto userDto);
	
	ApiResponse updateUser(Long Id, UserUpdateRequestDto userDto);

	void bookCar(UserCarBookingDto dto,CarPaymentDto pDto);

	List<UserBookingsDto> getAllBookings();

	List<TopCarsResponseDto> getTopCars();

	
	String addReview(CarReviewDto reviewDto);

	List<TopCarsResponseDto> allCarsByFilter(CarFilterRequestDto dto);
}
