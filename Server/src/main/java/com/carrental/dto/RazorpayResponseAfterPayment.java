package com.carrental.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class RazorpayResponseAfterPayment {
	private PaymentVerifyDto paymentVerify;
	private UserCarBookingDto bookingDto;
}
