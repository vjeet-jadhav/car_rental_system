package com.carrental.service;

import java.util.List;

import com.carrental.dto.ApiResponse;
import com.carrental.dto.UserBookingsDto;
import com.carrental.dto.UserCarBookingDto;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserResponseDto;
import com.carrental.dto.UserUpdateRequestDto;


public interface UserService {

	UserResponseDto RegisterUser(UserRequestDto userDto);
	
	ApiResponse updateUser(Long Id, UserUpdateRequestDto userDto);

	String bookCar(UserCarBookingDto dto);

	List<UserBookingsDto> getAllBookings();
}
