package com.carrental.dto;

import com.carrental.entity.CarStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HostCarDTO {

	private String brand;
	
	private String carModel;
	
	private String carNumber;
	
	private CarStatus status;
}
