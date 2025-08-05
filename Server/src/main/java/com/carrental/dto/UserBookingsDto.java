package com.carrental.dto;

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
	
	private String ownerFirstName;
	
	private String ownerSecondName;
	
	private String carBrand;
	
	private String carModel;
	
	private LocalDateTime startTrip;
	
	private LocalDateTime endTrip;
	
	private double perHourRate;
	
	private BookingStatus bookingStatus;
	
	private PaymentStatus paymentStatus;
}
