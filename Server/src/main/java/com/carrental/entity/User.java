package com.carrental.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString(callSuper = true) //exclude remain
public class User extends BaseEntity {
	
	@Column(name="first_name",length=50,nullable = false)
	private String firstName;
	
	@Column(name="last_name",length=50,nullable = false )
	private String lastName;
	
	@Column(name="email",length=50,unique = true, nullable = false)
	private String email;
	
	@Column(name="password",length=100,nullable = false)
	private String password;
	
	@Column(name="city",length=100,nullable = false)
	private String city;
	
	@Column(name="mobile_number",length=10,unique=true,nullable = false)
	private String mob_num;
	
	@Enumerated(EnumType.STRING)
	@Column(name="role",length=30,nullable = false)
	private UserRole userRole;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status",length=30,nullable = false)
	private UserStatus userStatus;
	
	@OneToMany(mappedBy = "host",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Car> hostedCars = new ArrayList<>();
	
	@OneToMany(mappedBy = "agent",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Car> approvedCars = new ArrayList<>();
	
//	helpers methods that helps
	
//	add cars to hostCars list
	public void addHostedCar(Car obj)
	{
		this.hostedCars.add(obj);
		obj.setHost(this);
	}
	
	
//	add cars to approvedCars list
	public void addApprovedCar(Car obj)
	{
		this.approvedCars.add(obj);
		obj.setAgent(this);
	}
	
	
//	delete car from hostCars
	public void removeHostedCar(Car obj)
	{
		this.hostedCars.remove(obj);
//		remove the link between user -> car
		obj.setHost(null);
	}
	
//	delete car from approvedCars
	public void removeApprovedCar(Car obj)
	{
		this.approvedCars.remove(obj);
		obj.setAgent(null);
	}
}
