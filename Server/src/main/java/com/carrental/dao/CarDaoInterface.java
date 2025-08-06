package com.carrental.dao;

import java.util.List;
import java.util.Optional;
<<<<<<< HEAD
=======

import org.springframework.data.jpa.repository.JpaRepository;
>>>>>>> 508301dd793a8fc11e44c6a5cd9bade7ae734481

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.dto.CarResponseDTO;
import com.carrental.entity.Car;

public interface CarDaoInterface extends JpaRepository<Car, Long> {


	List<Car> findByHostId(Long userId);

	boolean existsByRcNumber(String rcNumber);


}
