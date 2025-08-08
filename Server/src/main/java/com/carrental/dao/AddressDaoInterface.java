package com.carrental.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.entity.Address;

public interface AddressDaoInterface extends JpaRepository<Address, Long> {

	@Query("SELECT DISTINCT a.city FROM Address a")
	Optional<List<String>> getAllCity();

	@Query("SELECT DISTINCT a.serviceArea FROM Address a")
	Optional<List<String>> getAllServiceArea();

}
