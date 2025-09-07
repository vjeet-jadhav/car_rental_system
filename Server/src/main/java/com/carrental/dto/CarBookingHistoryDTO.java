package com.carrental.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CarBookingHistoryDTO {

	private String firstName;
    private String lastName;
    private String mob_num;
    
    private String brand;
    private String carModel;
    private String carNumber;
    
    private LocalDate bookingDate;
    private LocalDateTime startTrip;
    private LocalDateTime endTrip;
    private double amount;
	
	public CarBookingHistoryDTO()
	{
		
	}
}
