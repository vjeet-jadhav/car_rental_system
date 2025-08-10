package com.carrental.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class SignupResponseDto {
	
	private String message;
	private int statusCode;
}
