package com.carrental.service;

import java.util.List;

import com.carrental.dto.CarHistoryDTO;

public interface AgentService {

	List<CarHistoryDTO> getAgentHistory(Long agentId);

	List<CarHistoryDTO> getAgentVerificationList(Long agentId);

	void verifyCar(Long carId, String string);

	void rejectcar(Long carId);

}
