package com.carrental.dto;


import java.time.LocalDateTime;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserCarBookingDto {
	
	private LocalDateTime startTrip;
	
	private LocalDateTime endTrip;
	
	private double amount;
	
	private Long car;
	
	private Long client;
	
	private Long host;
}
