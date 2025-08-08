package com.carrental.dto;


import java.util.List;

import com.carrental.entity.CarFuelType;

import com.carrental.entity.CarTransmissionType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CarFilterRequestDto {
	
	private List<CarFuelType> fuelType;
		
	private List<CarTransmissionType> transmissionType;
	
	private List<Integer> seatCapacity;
	
	private double rating;
	
	private String serviceArea;
	
}
