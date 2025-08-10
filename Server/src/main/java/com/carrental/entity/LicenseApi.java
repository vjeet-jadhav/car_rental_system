package com.carrental.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class LicenseApi extends BaseEntity {
	
	 @NotBlank(message = "License number is mandatory")
	 @Pattern(regexp = "^[A-Z]{2}-\\d{2}-\\d{4}-\\d{6,7}$", message = "Invalid Indian driving license format. Expected format: XX-00-YYYY-XXXXXX")
	 @Column(name = "license_number", nullable = false, unique = true, length = 20)
	 private String licenseNumber;
	 
	 @NotNull(message = "Date of birth is mandatory")
	 @Past(message = "Date of birth must be in the past")
	 @Column(name = "date_of_birth", nullable = false)
	 private LocalDate dateOfBirth;
	 
	 	@NotNull(message = "Status is mandatory")
	    @Enumerated(EnumType.STRING)
	    @Column(name = "status", nullable = false, length = 10)
	    private LicenseStatus status ;
}
