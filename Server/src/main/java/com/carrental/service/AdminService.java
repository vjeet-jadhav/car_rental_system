package com.carrental.service;

import java.util.List;

import com.carrental.dto.AgentResDTO;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.BasicInfoDTO;
import com.carrental.dto.CarResponseDTO;
import com.carrental.dto.PendingCarDto;
import com.carrental.dto.RegisterAgentDTO;
import com.carrental.dto.TopCarsResponseDto;
import com.carrental.dto.UserResponseDto;

public interface AdminService {

	AgentResDTO register(RegisterAgentDTO dto);

	List<AgentResDTO> getAgents();

	ApiResponse assignAgentToCar(Long carId, Long agentId);

	BasicInfoDTO getBasicInfo();

	ApiResponse restrictCarById(Long carId);

	ApiResponse restrictUserById(Long carId);

	List<PendingCarDto> getPendingCars();

	List<TopCarsResponseDto> getAllCars();

	List<PendingCarDto> getEntireCarInfo();

	AgentResDTO getUserByEmail(String email);

}
