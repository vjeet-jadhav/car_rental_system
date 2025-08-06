package com.carrental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.carrental.entity.Car;

public interface CarDaoInterface extends JpaRepository<Car, Long> {

	List<Car> findByHostId(Long userId);
	
	boolean existsByRcNumber(String rcNumber);

}
