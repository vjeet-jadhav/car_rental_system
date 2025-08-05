package com.carrental.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.carrental.dao.AdminDao;
import com.carrental.dto.AgentResDTO;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.RegisterAgentDTO;
import com.carrental.dto.UserResponseDto;
import com.carrental.entity.User;
import com.carrental.entity.UserRole;
import com.carrental.entity.UserStatus;
import com.carrental.exception.ApiException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	private final AdminDao adminDao;
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
		return adminDao.findByUserRole(UserRole.AGENT)
				.stream()
				.map(user -> mapper.map(user, UserResponseDto.class))
				.toList();
	}

	@Override
	public ApiResponse assignAgentToCar(Long carId, Long agentId) {
		
		
		return null;
	}

}
