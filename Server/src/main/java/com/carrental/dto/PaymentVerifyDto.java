package com.carrental.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class PaymentVerifyDto {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}
