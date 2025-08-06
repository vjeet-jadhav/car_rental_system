package com.carrental.dto;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarReviewDto {
	
	private int rating;
	
	@Length(min = 2, max = 150)
	private String feedback;
	private Long car;
}
