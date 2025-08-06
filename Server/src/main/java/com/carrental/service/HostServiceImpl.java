package com.carrental.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.dao.CarDaoInterface;
import com.carrental.dao.HostDao;
import com.carrental.dto.CarRegistrationDTO;
import com.carrental.dto.CarResponseDTO;
import com.carrental.entity.Car;
import com.carrental.entity.Rating;
import com.carrental.entity.User;
import com.carrental.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class HostServiceImpl implements HostService {

	private final HostDao hostDao;
	private final CarDaoInterface carDao;
	private final ModelMapper mapper;

	
	public List<CarResponseDTO> getMyCars(Long userId) {
		
		//Taking host with is cars by custom query
		List<Car> cars = carDao.findByHostId(userId);
		
		System.out.println("HostService Implimentation ke getMycars ke under hu padul saheb...");
		
		return cars.stream()
			       .map(car -> {
			           // 1) Map all the scalar and address fields
			           CarResponseDTO dto = mapper.map(car, CarResponseDTO.class);

			           // 2) Compute the average rating (0 if no ratings)
			           double avg = car.getRatingList()
			                           .stream()
			                           .mapToInt(Rating::getRating)
			                           .average()
			                           .orElse(0.0);
			           
			           // Round or truncate as you prefer
			           dto.setRating(avg);

			           return dto;
			       })
			       .collect(Collectors.toList());
	}
	
	
	
}
