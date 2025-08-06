package com.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString(callSuper = true)
public class BasicInfoDTO {
	
	private int totalUsers;
	private int totalCars;
	private int totalHosts;
	private double totalRevenue;
	private int totalBookings;

}
