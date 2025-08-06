package com.carrental.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString(callSuper = true)
public class Payment  extends BaseEntity{

	@Column(nullable = false)
	private double amount;
	
	@Column(nullable = false , length = 30)
	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentStatus;
	
	@Column(length = 30, nullable = false)
	@Enumerated(EnumType.STRING)
	private PaymentMethod paymentMethod;

    @Column(name="payment_date_time")
    private LocalDateTime paymentTime;
    
    @OneToOne(optional = false)
    @JoinColumn(name = "booking_id", nullable = false )
    private Booking bookingId;
		
}
