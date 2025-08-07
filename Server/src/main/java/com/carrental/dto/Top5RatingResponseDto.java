package com.carrental.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Top5RatingResponseDto {
	private Double rating;
	private List<String> feedback;
}
