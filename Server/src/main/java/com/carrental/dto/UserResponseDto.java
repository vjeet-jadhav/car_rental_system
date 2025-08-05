package com.carrental.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String city;
	private String state;
	private int zipCode;
	private String mob_num;
}
