package com.carrental.entity;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import java.util.Collection;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString(callSuper = true,exclude={"hostedCars","approvedCars"}) //exclude remain
public class User extends BaseEntity implements UserDetails{
	
	@NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;
	
	@NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;
	
	@NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 50, message = "Email must not exceed 50 characters")
    @Column(name = "email", length = 50, unique = true, nullable = false)
    private String email;
	
	@NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    @Column(name = "password", length = 100, nullable = false)
    private String password;
	
	@NotBlank(message = "City is required")
    @Size(max = 100, message = "City must not exceed 100 characters")
    @Column(name = "city", length = 100, nullable = false)
    private String city;
	
	@Size(max = 30, message = "State must not exceed 30 characters")
    @Column(length = 30)
    private String state;
	
	@Min(value = 100000, message = "ZIP code must be at least 6 digits")
    @Max(value = 999999, message = "ZIP code must not exceed 6 digits")
    @Column(name = "zip_code")
    private int zipCode;
	
	@NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be exactly 10 digits")
    @Column(name = "mobile_number", length = 10, unique = true, nullable = false)
    private String mob_num;
	
	 @NotNull(message = "User role is required")
	    @Enumerated(EnumType.STRING)
	    @Column(name = "role", length = 30, nullable = false)
	    private UserRole userRole;
	
	 @NotNull(message = "User status is required")
	    @Enumerated(EnumType.STRING)
	    @Column(name = "status", length = 30, nullable = false)
	    private UserStatus userStatus;
	
	@NotBlank(message = "License number is mandatory")
	@Pattern(regexp = "^[A-Z]{2}-\\d{2}-\\d{4}-\\d{6,7}$", message = "Invalid Indian driving license format. Expected format: XX-00-YYYY-XXXXXX")
	@Column(name = "license_number", nullable = false, unique = true, length = 20)
	private String licenseNumber;
	
	@OneToMany(mappedBy = "host",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Car> hostedCars = new ArrayList<>();
	
	@OneToMany(mappedBy = "agent",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Car> approvedCars = new ArrayList<>();

	

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(this.userRole.name()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}

	
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
