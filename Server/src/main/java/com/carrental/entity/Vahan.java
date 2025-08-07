package com.carrental.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "vahan")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
public class Vahan extends BaseEntity {

    @Column(name = "rc_number", nullable = false, unique = true)
    private String rcNumber;
    
    @Column(name = "car_number", nullable = false, unique = true)
    private String carNumber;

    @Column(name = "car_brand", nullable = false)
    private String brand;

    @Column(name = "car_model", nullable = false)
    private String carModel;

    @Column(nullable = false)
    private String varient;

    @Column(name = "year_of_manufacturing", nullable = false)
    private LocalDate yearOfManufacturing;

    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type", nullable = false)
    private CarFuelType fuelType;

    @Min(2)
    @Max(7)
    @Column(name = "seat_capacity", nullable = false)
    private int seatCapacity;
    
    @Enumerated(EnumType.STRING)
	@Column(name="transmission_type")
	private CarTransmissionType transmissionType;

}
