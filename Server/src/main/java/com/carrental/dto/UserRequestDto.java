package com.carrental.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {
	@NotBlank
	@Length
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String password;
	
	private String city;
	
	private String mob_num;
}
