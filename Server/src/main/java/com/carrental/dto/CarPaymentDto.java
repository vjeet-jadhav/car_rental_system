package com.carrental.dto;

import com.carrental.entity.PaymentMethod;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CarPaymentDto {
	
	private double amount;
	private PaymentMethod paymentMethod;
}
