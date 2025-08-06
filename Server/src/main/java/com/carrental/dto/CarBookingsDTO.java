package com.carrental.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CarBookingsDTO {
	
    private String firstName;
    private String lastName;
    private String city;
    private String mobNum;
    private LocalDate bookingDate;
    private LocalDateTime startTrip;
    private LocalDateTime endTrip;
    private double amount;

   public CarBookingsDTO()
   {
	   
   }
}
