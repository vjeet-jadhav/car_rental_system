package com.carrental.dto;

import java.util.List;

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
	
	private Long carId;
	
	private Long hostId;
	
	private String brand;
	
	private String carModel;
	
	private CarStatus status;
	
	private CarFuelType fuelType;
	
	private CarTransmissionType transmissionType;
	
	private int seatCapacity;
	
	private double rating;
	
	private double dailyRate;
	
	private String serviceArea;
	
	private String firstName;
	
	private String lastName;
	
	private String address;
	
	private List<CarImgResponseDTO> imagelist;
}
