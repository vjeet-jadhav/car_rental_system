package com.carrental.dto;

import com.carrental.entity.CarStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
@AllArgsConstructor
public class CarHistoryDTO {
	private Long id;
	
	private String carNumber;
	
	private String brand;
	
	private String carModel;
	
	private String varient;
	
	private String firstName;
	
	private String mob_num;
	
	private String city;
	
	private CarStatus status;
}
