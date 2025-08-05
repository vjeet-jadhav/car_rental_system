package com.carrental.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.entity.Booking;
import com.carrental.entity.User;

public interface UserDaoInterface extends JpaRepository<User, Long>{


	boolean existsByEmail(String email);


	Optional<User> findByEmail(String email);

	@Query("SELECT b FROM Booking b WHERE b.client.id=:userId ORDER BY b.bookingdate DESC")
	List<Booking> fetchAllBooking(Long userId);

}
