package com.carrental.dao;

import java.util.List;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.dto.CarResponseDTO;

import com.carrental.entity.Car;

public interface CarDaoInterface extends JpaRepository<Car, Long> {

	List<Car> findByHostId(Long userId);
	
	boolean existsByRcNumber(String rcNumber);

	@Query("SELECT c FROM Car c JOIN FETCH c.address a JOIN FETCH c.host h WHERE LOWER(a.serviceArea) = LOWER(:city)")
	List<Car> findByServiceArea(String city);
	


}
