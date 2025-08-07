package com.carrental.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Ratings")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true,exclude= {"car","client"})

public class Rating extends BaseEntity{
	
	@Min(1)
	@Max(5)
	@Column(name = "rating" , nullable = false)
	private int rating;
	
	@Column(name = "feedback" , nullable = false , length = 1000)
	private String feedback;
	
	@ManyToOne
	@JoinColumn(name="client_id", nullable = false)
	private User client;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="car_id", nullable = false)
	private Car car;
	
}
