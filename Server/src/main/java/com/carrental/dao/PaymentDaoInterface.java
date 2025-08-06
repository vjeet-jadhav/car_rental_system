package com.carrental.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.entity.Payment;
import com.carrental.entity.User;

public interface PaymentDaoInterface extends JpaRepository<Payment, Long> {

	@Query("SELECT SUM(p.amount) * 0.20 FROM Payment p")
    Double getTotalAmount();
	
	@Query("SELECT p from Payment p where p.bookingId.id=:bookingId")
	Optional<Payment> findByBookingId(Long bookingId);
}
