package com.carrental.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="Bookings")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)

public class Booking extends BaseEntity{

	@Future
	@Column(name = "start_trip" , nullable = false)
	private LocalDateTime startTrip;
	
	@Future
	@Column(name = "end_trip" , nullable = false)
	private LocalDateTime endTrip;
	
	@Column(name = "amount" , nullable = false)
	private double amount;
	
	@Column(name = "booked_date")
	private LocalDate bookingdate;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private BookingStatus bookingStatus;
	
	@ManyToOne
	@JoinColumn(name="car_id", nullable = false)
	private Car car;
	
	@ManyToOne
	@JoinColumn(name="client_id", nullable = false)
	private User client;
	
	@ManyToOne
	@JoinColumn(name="host_id", nullable = false)
	private User host;
}
