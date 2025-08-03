package com.carrental.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Ratings")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)

public class Rating {
	@Min(1)
	@Max(5)
	@Column(name = "rating" , nullable = false)
	private int rating;
	@Column(name = "car_id" , nullable = false)
	private int carId;
	@Column(name = "client_id" , nullable = false)
	private int clientId;
	@NotBlank
	@Size(max = 1000)
	@Column(name = "feedback" , nullable = false , length = 1000)
	private String feedback;
	
}
