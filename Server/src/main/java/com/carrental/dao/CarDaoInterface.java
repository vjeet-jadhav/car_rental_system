package com.carrental.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.entity.Car;
import com.carrental.entity.CarFuelType;
import com.carrental.entity.CarStatus;
import com.carrental.entity.CarTransmissionType;

public interface CarDaoInterface extends JpaRepository<Car, Long> {

	@Query("SELECT c FROM Car c WHERE c.status IN (CarStatus.BOOKED, CarStatus.AVAILABLE, CarStatus.VERIFIED)")
	List<Car> findAllCarsByStatus();

	@Query("SELECT c From Car c WHERE "
			+ "(:fuelType IS NULL OR c.fuelType IN :fuelType) AND "
			+ "(:transmissionType IS NULL OR c.transmissionType IN :transmissionType) AND "
			+ "(:seatCapacity IS NULL OR c.seatCapacity IN :seatCapacity)")
	List<Car> getAllCarsByFilter(@Param("fuelType") List<CarFuelType> fuelType,@Param("transmissionType") List<CarTransmissionType> transmissionType,@Param("seatCapacity") List<Integer> seatCapacity);

	

	

}
