package com.carrental.dao;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.dto.CarResponseDTO;

import com.carrental.entity.Car;
import com.carrental.entity.CarFuelType;
import com.carrental.entity.CarStatus;
import com.carrental.entity.CarTransmissionType;

public interface CarDaoInterface extends JpaRepository<Car, Long> {


	@Query("SELECT c FROM Car c WHERE c.status IN (CarStatus.AVAILABLE,CarStatus.BOOKED,CarStatus.VERIFIED)")
	List<Car> findAllCarsByStatus();

	
//	@Query("SELECT c From Car c WHERE "
//			+ "(:fuelType IS NULL OR c.fuelType IN :fuelType) AND "
//			+ "(:transmissionType IS NULL OR c.transmissionType IN :transmissionType) AND "
//			+ "(:seatCapacity IS NULL OR c.seatCapacity IN :seatCapacity)")
//	List<Car> getAllCarsByFilter(@Param("fuelType") List<CarFuelType> fuelType,@Param("transmissionType") List<CarTransmissionType> transmissionType,@Param("seatCapacity") List<Integer> seatCapacity);

	List<Car> findByHostId(Long userId);
	
	boolean existsByRcNumber(String rcNumber);

	@Query("SELECT c FROM Car c JOIN FETCH c.address a JOIN FETCH c.host h WHERE LOWER(a.serviceArea) = LOWER(:city)")
	List<Car> findByServiceArea(String city);

	
//	get available slot cars
	@Query("SELECT c FROM Car c WHERE "
		    + "(c.status IN(CarStatus.AVAILABLE)) AND "
		    + "((c.sheduledFrom IS NULL OR c.sheduledFrom <= :startTrip) AND "
		    + "(c.sheduledTill IS NULL OR c.sheduledTill >= :endTrip)) AND "
		    + "(c.id NOT IN :listCarId)")
		Optional<List<Car>> getAvailableCars(List<Integer> listCarId, LocalDate startTrip, LocalDate endTrip);


	@Query("SELECT c FROM Car c WHERE c.status IN (CarStatus.PENDING)")
	List<Car> getByStatus();


	@Query("SELECT c FROM Car c WHERE c.status IN (CarStatus.PENDING,CarStatus.REJECTED,CarStatus.VERIFIED,CarStatus.AVAILABLE)")
	List<Car> getCarsToRestrict();

	    
	


}
