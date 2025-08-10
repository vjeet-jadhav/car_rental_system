package com.carrental.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.carrental.entity.BookingStatus;
import com.carrental.entity.PaymentStatus;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserBookingsDto {
	
	private Long carId;
	
	private String firstName;
	
	private String lastName;
	
	private String brand;
	
	private String carModel;
	
	private LocalDateTime startTrip;
	
	private LocalDateTime endTrip;
	
	private double dailyRate;
	
	private double totalAmount;
	
	private LocalDate bookingDate;
	
	private BookingStatus bookingStatus;
	
	private PaymentStatus paymentStatus;
}
