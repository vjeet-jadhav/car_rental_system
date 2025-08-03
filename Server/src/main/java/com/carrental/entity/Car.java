package com.carrental.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "Cars")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)

public class Car {

	@Column(name="host_id", nullable = false)
	private int hostId;
	@Column(name="car_brand", nullable = false)
	private String brand;
	@Column(name="car_maodel", nullable = false)
	private String carModel;
	@Column(name="year_of_manufacturing", nullable = false)
	private String yearOfManufacturing;
	@Column(nullable = false)
	private String varient;
	@Column(name="rc_number", nullable = false)
	private String rcNumber;
	@Column(name="daily_rate", nullable = false)
	private double dailyRate;
	@Column(name="car_status", nullable = false)
	private CarStatus status;
	@Column(name="fuel_type", nullable = false)
	private CarFuelType fuelType;
	@Column(name="transmission_type", nullable = false)
	private CarTransmissionType transmissionType;
	@Column(name="saet_capacity", nullable = false)
	private int seatCapacity;
	@Column(name="agent_id", nullable = false)
	private int agentId;
	@Column(name="approved_at", nullable = false)
	private LocalDate approvedAt;
	@Column(name="address_id", nullable = false)
	private int addrressId;
	
}
