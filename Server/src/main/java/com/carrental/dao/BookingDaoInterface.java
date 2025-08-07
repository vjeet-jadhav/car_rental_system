package com.carrental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.dto.HostTotalEarningDTO;
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
}
