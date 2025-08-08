package com.carrental.entity;

import java.time.LocalDate;

import java.util.ArrayList;

import java.util.ArrayList;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "Cars")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true,exclude={"ratingList","host","agent"})
public class Car extends BaseEntity{

	@Column(name="car_brand", nullable = false)
	private String brand;
	
	@Column(name="car_model", nullable = false)
	private String carModel;
	
	@Column(nullable = false)
	private String varient;
	
	@Column(name="year_of_manufacturing", nullable = false)
	private LocalDate yearOfManufacturing;
	
	@Column(name="car_number", nullable = false, unique = true)
	private String carNumber;
	
	@Column(name="rc_number", nullable = false, unique = true)
	private String rcNumber;
	
	@Column(name="daily_rate", nullable = false)
	private double dailyRate;
	
	@Column(name="sheduled_from", nullable = true)
	private LocalDate sheduledFrom;
	
	@Column(name="sheduled_Till", nullable = true)
	private LocalDate sheduledTill;
	
	@Enumerated(EnumType.STRING)
	@Column(name="car_status", nullable = false)
	private CarStatus status;
	
	@Enumerated(EnumType.STRING)
	@Column(name="fuel_type", nullable = false)
	private CarFuelType fuelType;
	
	@Enumerated(EnumType.STRING)
	@Column(name="transmission_type", nullable = false)
	private CarTransmissionType transmissionType;
	
	@Min(2)
	@Max(7)
	@Column(name="seat_capacity", nullable = false )
	private int seatCapacity;
	
	@Column(name="approved_at")
	private LocalDate approvedAt;
	
	@ManyToOne
	@JoinColumn(name = "host_id")
	private User host;
	
	@ManyToOne
	@JoinColumn(name = "agent_id")
	private User agent;
	

	@OneToOne(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
	private Address address;
	

	
	@OneToMany(mappedBy = "car",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Rating> ratingList = new ArrayList<>();
	

	
//	helpers methods that helps
	
//	add Address to car
	public void addAddress(Address obj)
	{
		this.setAddress(obj);
		obj.setCar(this);
	}
	
// remove Address from car
	public void removeAddress(Address obj)
	{
		this.setAddress(null);
		obj.setCar(null);
	}

}
