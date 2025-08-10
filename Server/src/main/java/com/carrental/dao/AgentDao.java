package com.carrental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.carrental.dto.*;

import com.carrental.entity.Car;

public interface AgentDao extends JpaRepository<Car, Long> {
	@Query("""
				SELECT new com.carrental.dto.CarHistoryDTO(
		c.id,		
        c.carNumber,
        c.brand,
        c.carModel,
        c.varient,
        c.host.firstName,
        c.host.mob_num,      
        c.address.city,
        c.status
      )
      FROM Car c	
      WHERE c.agent.id = :agentId 
			    and c.status != com.carrental.entity.CarStatus.NOTVERIFIED
      
			""")
	
	List<CarHistoryDTO> findHistoryByAgentId(Long agentId);

	@Query("""
			SELECT new com.carrental.dto.CarHistoryDTO(
	c.id,		
    c.carNumber,
    c.brand,
    c.carModel,
    c.varient,
    c.host.firstName,
    c.host.mob_num,      
    c.address.city,
    c.status
  )
  FROM Car c	
  WHERE c.agent.id = :agentId
			and c.status = com.carrental.entity.CarStatus.NOTVERIFIED
		""")
	List<CarHistoryDTO> findPendingRequestsByAgentId(Long agentId);

}
