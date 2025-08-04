package com.carrental.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {
	@NotBlank(message = "First Name is Required")
	@Length(min = 5, max = 20, message = "Invalid First Name Lenght")
	private String firstName;
	
	@NotBlank(message = "Last Name is Required")
	@Length(min = 5, max = 20, message = "Invalid Last Name Length")
	private String lastName;
	
	@NotBlank(message = "Email is Required")
	@Email
	private String email;
	
	@Pattern
	(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format")
	private String password;
	
	@NotBlank(message = "City is Required")
	private String city;
	
	@NotBlank(message = "State is Required")
	private String state;
	
	@NotNull(message = "Zip Code Required")
	private int zipCode;
	
	@NotBlank(message = "Mobile Number is Required")
	@Length(max = 10, message = "Mobile Number Max Length Exceeded")
	private String mob_num;
}
