package com.carrental.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.data.jpa.repository.Query;

import com.carrental.dto.ApiResponse;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.CarFilterRequestDto;
import com.carrental.dto.CarPaymentDto;
import com.carrental.dto.CarResponseDTO;
import com.carrental.dto.TopCarsResponseDto;

import com.carrental.dto.CarReviewDto;
import com.carrental.dto.ImgResponseDTO;
import com.carrental.dto.ResponseForCarCities;
import com.carrental.dto.Top5RatingResponseDto;
import com.carrental.dto.UserBookingsDto;
import com.carrental.dto.UserCarBookingDto;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserRequestForAvilableCarsForBooking;
import com.carrental.dto.UserResponseDto;
import com.carrental.dto.UserUpdateRequestDto;
import com.carrental.entity.Car;

import jakarta.validation.Valid;


public interface UserService {

	UserResponseDto RegisterUser(UserRequestDto userDto);
	
	ApiResponse updateUser(Long Id, UserUpdateRequestDto userDto);

	void bookCar(UserCarBookingDto dto,CarPaymentDto pDto);

	List<UserBookingsDto> getAllBookings();

	List<TopCarsResponseDto> getTopCars();

	String addReview(CarReviewDto reviewDto);

	List<TopCarsResponseDto> allCarsByFilter(CarFilterRequestDto dto,@Valid UserRequestForAvilableCarsForBooking adto);
	
    ApiResponse addImage(Long userId, String imgUrl, String string, String string2);

	ApiResponse addCarImg(Long carId, List<ImgResponseDTO> urls);
  
	Top5RatingResponseDto top5Reviews(Long carId);

	ApiResponse updateImage(Long userId, ImgResponseDTO obj);

	// CarRepository.java
//	@Query("SELECT c FROM Car c JOIN FETCH c.address a WHERE LOWER(a.serviceArea) = LOWER(:city)")
	List<CarResponseDTO> getNearByCars(String city);

	List<TopCarsResponseDto> getAllAvailableCarsForBooking(@Valid UserRequestForAvilableCarsForBooking dto);

	List<String> getCityOfCars();

	List<String> getServiceAreaOfCars();
}
