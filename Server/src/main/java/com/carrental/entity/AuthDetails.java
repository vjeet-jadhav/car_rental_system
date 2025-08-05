package com.carrental.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class AuthDetails {
	private Long id;
	private UserRole userRole;
	private String fname;
}
