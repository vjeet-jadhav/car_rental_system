package com.carrental.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.dao.UserDaoInterface;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserResponseDto;
import com.carrental.dto.UserUpdateRequestDto;
import com.carrental.entity.User;
import com.carrental.entity.UserRole;
import com.carrental.entity.UserStatus;
import com.carrental.exception.ApiException;
import com.carrental.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService{
	private final UserDaoInterface userDaoInterface;
	private ModelMapper modelMapper;
	private PasswordEncoder password;

	@Override
	public UserResponseDto RegisterUser(UserRequestDto userDto) {
		if(userDaoInterface.existsByEmail(userDto.getEmail()))
			throw new ApiException("Duplicate Email Found....... User Already Exist");
		User user = modelMapper.map(userDto, User.class);
		user.setPassword(password.encode(userDto.getPassword()));
		user.setUserRole(UserRole.USER);
		user.setUserStatus(UserStatus.ACTIVE);
		return modelMapper.map(userDaoInterface.save(user), UserResponseDto.class);
	}

	@Override
	public ApiResponse updateUser(Long Id, UserUpdateRequestDto userDto) {
		
		User user = userDaoInterface.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Invaild User ID : Update Failed"));
		modelMapper.map(userDto, user);
		return new ApiResponse("User Successfully Updated");
	}
	
}
