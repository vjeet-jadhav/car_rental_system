package com.carrental.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CombineRequestFilterForFilter {
	private CarFilterRequestDto carFilter ;
	private UserRequestForAvilableCarsForBooking availableCars;
}
