package com.carrental.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.carrental.dao.AgentDao;
import com.carrental.dto.CarHistoryDTO;
import com.carrental.entity.*;
import com.carrental.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AgentServiceImpl implements AgentService {
	private AgentDao agentDao;
	
	@Override
	public List<CarHistoryDTO> getAgentHistory(Long agentId) {
		
		return agentDao.findHistoryByAgentId(agentId);
	}

	@Override
	public List<CarHistoryDTO> getAgentVerificationList(Long agentId) {
		return agentDao.findPendingRequestsByAgentId(agentId);
	}

	@Override
	public void verifyCar(Long carId, String newStatus) {
		Car car = agentDao.findById(carId).
				orElseThrow(()-> new ResourceNotFoundException("Car Not Found With id" + carId));
		
		car.setStatus(CarStatus.VERIFIED);
		agentDao.save(car);
		
	}

	@Override
	public void rejectcar(Long carId) {
		Car car = agentDao.findById(carId)
				.orElseThrow(()-> new ResourceNotFoundException("Car Not Found with id " + carId));
		car.setStatus(CarStatus.REJECTED);
		agentDao.save(car);
						
	}

}
