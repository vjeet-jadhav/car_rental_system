package com.carrental.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.carrental.dao.AdminDao;
import com.carrental.dto.AgentResDTO;
import com.carrental.dto.RegisterAgentDTO;
import com.carrental.entity.User;
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
		if(adminDao.existsByEmail(dto.getEmail()))
			throw new ApiException("Duplicate Email Detected: Agent Exists Already !");
		User entity = mapper.map(dto, User.class);
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		return mapper.map(adminDao.save(entity), AgentResDTO.class);
	}

}
