package com.carrental.entity;

import java.util.List;

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
	
	@Column(length = 30)
	private String state;
	
	@Column(name = "zip_code")
	private int zipCode;
	
	@Column(name="mobile_number",length=10,unique=true,nullable = false)
	private String mob_num;
	
	@Enumerated(EnumType.STRING)
	@Column(name="role",length=30,nullable = false)
	private UserRole userRole;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status",length=30,nullable = false)
	private UserStatus userStatus;
	
	@OneToMany(mappedBy = "host")
	private List<Car> hostedCars;
	
	@OneToMany(mappedBy = "agent")
	private List<Car> approvedCars;
	
}
