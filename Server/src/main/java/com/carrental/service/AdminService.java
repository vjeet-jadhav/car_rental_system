package com.carrental.service;

import com.carrental.dto.AgentResDTO;
import com.carrental.dto.RegisterAgentDTO;

public interface AdminService {

	AgentResDTO register(RegisterAgentDTO dto);

}
