package com.carrental.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.dto.CarBookingHistoryDTO;
import com.carrental.dto.CarBookingsDTO;
import com.carrental.entity.Booking;

public interface BookingDaoInterface extends JpaRepository<Booking, Long> {

	
	@Query("""
		      SELECT new com.carrental.dto.CarBookingsDTO(
		        b.client.firstName,
		        b.client.lastName,
		        b.client.city,
		        b.client.mob_num,          
		        b.bookingdate,
		        b.startTrip,
		        b.endTrip,
		        b.amount
		      )
		      FROM Booking b
		      WHERE b.car.id = :carId
		        AND b.endTrip > CURRENT_TIMESTAMP
		      """)
	Optional<List<CarBookingsDTO>> findActiveBookingsByCarId(@Param("carId") Long carId);
	
	
	@Query("""
	        SELECT new com.carrental.dto.CarBookingHistoryDTO(
	            b.client.firstName,
	            b.client.lastName,
	            b.car.brand,
	            b.car.carModel,
	            b.car.carNumber,
	            b.bookingdate,
	            b.startTrip,
	            b.endTrip,
	            b.amount
	        )
	        FROM Booking b
	        WHERE b.client.id = :userId
	        ORDER BY b.bookingdate DESC
	    """)
	Optional<List<CarBookingHistoryDTO>> findHistoryByClientId(Long userId);


}
