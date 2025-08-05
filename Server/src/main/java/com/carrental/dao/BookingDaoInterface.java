package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.Booking;

public interface BookingDaoInterface extends JpaRepository<Booking, Long> {

}
