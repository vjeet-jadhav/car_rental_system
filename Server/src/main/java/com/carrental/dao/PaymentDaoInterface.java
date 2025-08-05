package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.entity.Payment;

public interface PaymentDaoInterface extends JpaRepository<Payment, Long> {

	@Query("SELECT SUM(p.amount) * 0.20 FROM Payment p")
    Double getTotalAmount();
}
