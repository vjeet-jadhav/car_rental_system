package com.carrental.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.dao.HostDao;
import com.carrental.dto.HostAndCarsDTO;
import com.carrental.entity.User;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class HostServiceImpl implements HostService {

	private final HostDao hostDao;
	private final ModelMapper mapper;

	
	public HostAndCarsDTO getMyCars(Long userId) {
		
		//Taking host with is cars by custom query
		User host = hostDao.getMyCars(userId)
				.orElseThrow(null);
		
		return mapper.map(host,HostAndCarsDTO.class);
	}
	
	
	
}
