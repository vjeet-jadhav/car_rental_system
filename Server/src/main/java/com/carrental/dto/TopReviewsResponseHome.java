package com.carrental.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class TopReviewsResponseHome {
	
	private String firstNmae;
	
	private String lastName;
	
	private String carModel;
	
	private String carBrand;
	
	private int rating;
	
	private String feedback;
	
}
