package com.carrental.dto;

import java.time.LocalDate;


import com.carrental.entity.CarFuelType;
import com.carrental.entity.CarStatus;
import com.carrental.entity.CarTransmissionType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CarRegistrationDTO {

	private Long id;
	
	@NotBlank
    private String brand;

    @NotBlank
    private String carModel;

    @NotBlank
    private String varient;

    @NotNull
    private LocalDate yearOfManufacturing;

    @NotBlank
    private String carNumber;

    @NotBlank
    private String rcNumber;

    @NotNull
    private Double dailyRate;
    
    @NotNull
    private CarStatus status;

    @NotNull
    private CarFuelType fuelType;

    @NotNull
    private CarTransmissionType transmissionType;

    @Min(2)
    @Max(7)
    @NotNull
    private Integer seatCapacity;

    @NotNull
    private AddressDTO address;
}
