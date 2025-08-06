package com.carrental.dto;

import com.carrental.entity.CarFuelType;
import com.carrental.entity.CarStatus;
import com.carrental.entity.CarTransmissionType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class TopCarsResponseDto {
	private String brand;
	
	private String carModel;
	
	private CarStatus status;
	
	private CarFuelType fuelType;
	
	private CarTransmissionType transmissionType;
	
	private int seatCapacity;
	
	private int rating;
	
	private double dailyRate;
}
