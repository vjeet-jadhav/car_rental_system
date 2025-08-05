package com.carrental.service;

import java.util.List;

import com.carrental.dto.AgentResDTO;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.BasicInfoDTO;
import com.carrental.dto.RegisterAgentDTO;
import com.carrental.dto.UserResponseDto;
import com.carrental.entity.UserRole;

public interface AdminService {

	AgentResDTO register(RegisterAgentDTO dto);

	List<UserResponseDto> getAgents();

	ApiResponse assignAgentToCar(Long carId, Long agentId);

	BasicInfoDTO getBasicInfo();

}
