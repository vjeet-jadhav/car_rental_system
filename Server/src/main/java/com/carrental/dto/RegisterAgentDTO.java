package com.carrental.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
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
	
	@NotNull
	@Pattern(regexp = "^[A-Z]{2}-\\d{2}-\\d{4}-\\d{6,7}$", message = "Invalid Indian driving license format. Expected format: XX-00-YYYY-XXXXXX")
	private String license_num;
	
	@NotNull(message = "Date of birth is mandatory")
	@Past(message = "Date of birth must be in the past")
	private String dob;

}
