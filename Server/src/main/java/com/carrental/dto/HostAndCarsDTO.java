package com.carrental.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HostAndCarsDTO {
	
	private String firstName;
	
	private String lastName;
	
	private List<HostCarDTO> hostedCars = new ArrayList<>();
}
