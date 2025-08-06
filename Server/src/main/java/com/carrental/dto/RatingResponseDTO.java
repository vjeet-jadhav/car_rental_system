package com.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class RatingResponseDTO {

	private int rating;
	
	private String feedback;
	
	private ClientResponseDTO client;
	
	
}
