package com.carrental.dao;

import java.time.LocalDateTime;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.dto.HostTotalEarningDTO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.dto.CarBookingHistoryDTO;
import com.carrental.dto.CarBookingsDTO;
import com.carrental.entity.Booking;

public interface BookingDaoInterface extends JpaRepository<Booking, Long> {


	@Query("""
			SELECT new com.carrental.dto.HostTotalEarningDTO(
				b.car.id,
				b.car.brand,
				b.car.carModel,
				b.car.carNumber,
				COALESCE(SUM(b.amount), 0)
			)
			from Booking b
			where b.host.id = :hostId
			Group By 
				b.car.id,
				b.car.brand,
				b.car.carModel,
				b.car.carNumber
				
			""")
	List<HostTotalEarningDTO> getTotalEarnings(Long hostId);

	
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


	//PROVIDE BOOKED CARS IN TIME ZONE
	@Query("SELECT b.car.id FROM Booking b WHERE b.startTrip < :endTrip AND b.endTrip > :startTrip")
	List<Integer> getAlreadyBookedCars(LocalDateTime startTrip, LocalDateTime endTrip);

}
