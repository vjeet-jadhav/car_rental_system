package com.carrental.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
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

public class Booking {
	
	@Column(name = "car_id" , nullable = false)
	private int carId;
	@Column(name = "client_id" , nullable = false)
	private int cilentId;
	@Column(name = "host_id" , nullable = false)
	private int hostId;
	@NotNull
	@Future
	@Column(name = "start_trip" , nullable = false)
	private LocalDate startTrip;
	@NotNull
	@Future
	@Column(name = "end_trip" , nullable = false)
	private LocalDate endTrip;
	@Column(name = "amount" , nullable = false)
	private double amount;
	
}
