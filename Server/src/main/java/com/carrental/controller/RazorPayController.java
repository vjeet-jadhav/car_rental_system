package com.carrental.controller;

import java.io.Console;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.config.RazorPayConfig;
import com.carrental.dto.BookingRequestComDto;
import com.carrental.dto.CarPaymentDto;
import com.carrental.dto.PaymentRequestDto;
import com.carrental.dto.RazorpayResponseAfterPayment;
import com.carrental.dto.UserCarBookingDto;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@AllArgsConstructor
public class RazorPayController {

    
	
	private RazorPayConfig razorConfig;
	private RazorpayClient razorpayClient;
//	For adding the details to our data base;
	private UserController userCon;
	private ModelMapper modelMapper;
    
	
	@PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentRequestDto paymentRequest) {
        try {
            JSONObject options = new JSONObject();
            options.put("amount", paymentRequest.getAmount() * 100); // convert to paise
            options.put("currency", "INR");
            options.put("receipt", "txn_" + System.currentTimeMillis());
            Order order = razorpayClient.orders.create(options);
            return ResponseEntity.ok(order.toString());
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\":\"" + e.getMessage() + "\"}");        }
    }
	
	
	
	
	@PostMapping("/verify")
	public ResponseEntity<?> verifyPayment(@RequestBody RazorpayResponseAfterPayment paymentResponse) {
	    try {
	        String orderId = paymentResponse.getPaymentVerify().getRazorpayOrderId();
	        String paymentId = paymentResponse.getPaymentVerify().getRazorpayPaymentId();
	        String signature = paymentResponse.getPaymentVerify().getRazorpaySignature();

	        // Prepare data to verify
	        JSONObject params = new JSONObject();
	        params.put("razorpay_order_id", orderId);
	        params.put("razorpay_payment_id", paymentId);
	        params.put("razorpay_signature", signature);

	        String secret = razorConfig.getKeySecret(); // your Razorpay API secret

	        System.out.println("request is comming for verification");
	        // Use Razorpay SDK to verify signature
	        boolean isValid = Utils.verifyPaymentSignature(params, secret);

//	        on fail
	        if (!isValid) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature. Payment verification failed.");
	        }
	        
	        
	        
//	        on success
	        UserCarBookingDto obj1 = paymentResponse.getBookingDto();
	        Payment payment = razorpayClient.payments.fetch(paymentId);
	        String id = payment.get("id");
	        String status = payment.get("status");
	        String method = payment.get("method");

	        CarPaymentDto obj2 = new CarPaymentDto();
	        obj2.setRazorPayId(id);
	        obj2.setAmount(obj1.getAmount());
	        obj2.setPaymentMethod(method.toUpperCase());
	        
	        
	        BookingRequestComDto dto = new BookingRequestComDto();
	        dto.setBookingDto(obj1);
	        dto.setPaymentDto(obj2);
	        
	        System.out.println(dto.toString());
	        
	        // Proceed to save payment or take action
	        return ResponseEntity.ok(userCon.userCarBooking(dto));

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Verification failed: " + e.getMessage());
	    }
	}
	
}
