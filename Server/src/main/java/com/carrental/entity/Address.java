package com.carrental.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
public class Address extends BaseEntity{
	
	@Column(length = 255, nullable = false)
	private String address;
	
	@Column(length = 50, nullable = false)
	private String city;
	
	@Column(length = 50, nullable = false)
	private String state;
	
	@Column(name = "service_area", length = 100)
	private String serviceArea;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "car_id", nullable = false, unique = true)
	private Car car;
}
