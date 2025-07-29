// User.java - placeholder
package com.carrental.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString(callSuper = true)
public class User extends BaseEntity {
	@Column(name="first_name",length=20)
	private String firstName;
	@Column(name="last_name",length=20)
	private String lastName;
	@Column(name="email",length=30,unique=true)
	private String email;
	@Column(name="password",length=100,nullable=false) //not null
	private String password;
	@Column(name="phone_number",length=10)
	private String phoneNumber;
	@Enumerated(EnumType.STRING)
	@Column(name="user_role",length=30)
	private UserRole userRole;
	@Enumerated(EnumType.STRING)
	@Column(name="user_status",length=30)
	private UserStatus userStatus;
	@Column(name="city",length=50)
	private String city;
	@Lob
	@Column(name="user_image")
	private byte[] userImage;
	

	
	public User(String firstName,String lastName,String email,String password,String phone,UserRole role,UserStatus status,String city) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email=email;
		this.password=password;
		this.phoneNumber=phone;
		this.userRole=role;
		this.userStatus=status;
		this.city=city;
	}
	
	
	
}

