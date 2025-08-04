package com.carrental.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserLoginRequestDto {
	private String email;
	private String password;
	private String city;
}
