package com.carrental.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class RegisterAgentDTO {
	
	@NotBlank(message = "first name is required")
	@Length(min=5, max=20,message = "invalid length of first name")
	private String firstName;
	
	@NotBlank(message = "last name is required")
	@Length(min=5, max=20,message = "invalid length of last name")
	private String lastName;
	
	@NotBlank
	@Email(message = "invalid email format")
	private String email;
	
	@NotBlank
	private String mob_num;
	
	@NotBlank
	private String city;
	
	
	private String state;
	
	private int zipCode;
	
	@NotBlank
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format")
	private String password;

}
