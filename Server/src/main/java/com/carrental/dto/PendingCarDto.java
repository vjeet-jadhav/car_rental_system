package com.carrental.dto;

import java.time.LocalDate;

import com.carrental.entity.CarStatus;
import com.carrental.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PendingCarDto {
	
	private User user;
	
	private Long id;
	
    private String brand;

    private String carModel;

    private String varient;

    private LocalDate creationDate;

    private String carNumber;

    private String rcNumber;
    
    private CarStatus status;

    private AddressDTO address;
    
    private double rating;
    
    private int bookings;
    
    private double income;
	
}
