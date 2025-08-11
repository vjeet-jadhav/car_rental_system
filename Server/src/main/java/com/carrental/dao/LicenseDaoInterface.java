package com.carrental.dao;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.entity.LicenseApi;
import com.carrental.entity.LicenseStatus;

public interface LicenseDaoInterface extends JpaRepository<LicenseApi, Long> {

	
	@Query("SELECT l from LicenseApi l where l.licenseNumber=:Number AND l.dateOfBirth=:dob AND l.status=:l_Status")
	LicenseApi validateLicenseNumber(String Number, LocalDate dob, LicenseStatus l_Status);

}
