package com.carrental.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BookingRequestComDto {
	private UserCarBookingDto bookingDto;
	private CarPaymentDto paymentDto;
}
