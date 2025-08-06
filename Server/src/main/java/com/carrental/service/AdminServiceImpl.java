package com.carrental.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.carrental.dao.AdminDao;
import com.carrental.dao.BookingDaoInterface;
import com.carrental.dao.CarDaoInterface;
import com.carrental.dao.PaymentDaoInterface;
import com.carrental.dto.AgentResDTO;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.BasicInfoDTO;
import com.carrental.dto.RegisterAgentDTO;
import com.carrental.dto.UserResponseDto;
import com.carrental.entity.Car;
import com.carrental.entity.CarStatus;
import com.carrental.entity.User;
import com.carrental.entity.UserRole;
import com.carrental.entity.UserStatus;
import com.carrental.exception.ApiException;
import com.carrental.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	private final AdminDao adminDao;
	private final CarDaoInterface carDao;
	private final BookingDaoInterface bookingDao;
	private final PaymentDaoInterface paymentDao;
	private ModelMapper mapper;
	private PasswordEncoder passwordEncoder;

	@Override
	public AgentResDTO register(RegisterAgentDTO dto) {
		// TODO Auto-generated method stub
//		System.out.println(dto.toString());
		if(adminDao.existsByEmail(dto.getEmail()))
			throw new ApiException("Duplicate Email Detected: Agent Exists Already !");
		User entity = mapper.map(dto, User.class);
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity.setUserRole(UserRole.AGENT);
		entity.setUserStatus(UserStatus.ACTIVE);
		return mapper.map(adminDao.save(entity), AgentResDTO.class);
	}

	@Override
	public List<UserResponseDto> getAgents() {
//		System.out.println("here");
		return adminDao.findByUserRoleAndUserStatus(UserRole.AGENT,UserStatus.ACTIVE)
				.stream()
				.map(user -> mapper.map(user, UserResponseDto.class))
				.toList();
	}

	@Override
	public ApiResponse assignAgentToCar(Long carId, Long agentId) {
		
		Car car = carDao.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car with given id is not found !"));
		User agent = adminDao.findById(agentId).orElseThrow(() -> new ResourceNotFoundException("Agent with given id is not found !"));
		car.setAgent(agent);
		
		return new ApiResponse("Agent Assigned to Car !");
	}

	@Override
	public BasicInfoDTO getBasicInfo() {
		// TODO Auto-generated method stub
		BasicInfoDTO info = new BasicInfoDTO(0, 0, 0, 0, 0);
		 info.setTotalCars((int)carDao.count()); 
		 info.setTotalUsers((int)adminDao.count());
		 info.setTotalBookings((int)bookingDao.count());
		 info.setTotalRevenue((double)paymentDao.getTotalAmount());
		 info.setTotalHosts((int)adminDao.findByUserRoleAndUserStatus(UserRole.HOST,UserStatus.ACTIVE).size());
//		 System.out.println(info);
		return info;
	}

	@Override
	public ApiResponse restrictCarById(Long carId) {
		// TODO Auto-generated method stu
		Car car = carDao.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car with given id is not found !"));
		car.setStatus(CarStatus.DELETED);
		return new ApiResponse("Car Restricted By Admin");
	}

	@Override
	public ApiResponse restrictUserById(Long userId) {
		// TODO Auto-generated method stub
		User user = adminDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User with given id is not found !"));
		user.setUserStatus(UserStatus.INACTIVE);

		return new ApiResponse("User Restricted By Admin");
	}

}
