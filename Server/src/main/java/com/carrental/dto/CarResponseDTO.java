package com.carrental.dto;

import java.time.LocalDate;
import java.util.List;

import com.carrental.entity.CarFuelType;
import com.carrental.entity.CarStatus;
import com.carrental.entity.CarTransmissionType;
import com.carrental.entity.Rating;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CarResponseDTO {

	private Long id;
	
    private String brand;

    private String carModel;

    private String varient;

    private LocalDate yearOfManufacturing;

    private String carNumber;

    private Double dailyRate;
    
    private CarStatus status;

    private CarFuelType fuelType;

    private CarTransmissionType transmissionType;

    private Integer seatCapacity;
    
    private double rating;

    private AddressDTO address;
    
    private List<CarImgResponseDTO> imagelist;
    
    
}
