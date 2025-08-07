package com.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class HostTotalEarningDTO {
	private Long id;
	
	private String brand;
	
	private String carModel;
	
	private String carNumber;
	
	private double earning;
	
}
