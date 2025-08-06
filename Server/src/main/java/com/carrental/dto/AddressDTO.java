package com.carrental.dto;



import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class AddressDTO {
	
	@NotBlank
	private String address;
	
	@NotBlank
	private String city;
	
	@NotBlank
	private String state;
	
	@NotBlank
	private String serviceArea;
	
	@NotNull
	@Min(110001)   // smallest 6-digit number
	@Max(999999)
	private long pinCode;
	
	
}
