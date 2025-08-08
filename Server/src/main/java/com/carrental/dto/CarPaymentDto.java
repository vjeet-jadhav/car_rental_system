package com.carrental.dto;

import com.carrental.entity.PaymentMethod;
import com.carrental.entity.PaymentStatus;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CarPaymentDto {
	private String razorPayId;
	private double amount;
	private String paymentMethod;
}
