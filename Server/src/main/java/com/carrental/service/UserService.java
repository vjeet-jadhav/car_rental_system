package com.carrental.service;

import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserResponseDto;


public interface UserService {

	UserResponseDto RegisterUser(UserRequestDto userDto);
	
}
