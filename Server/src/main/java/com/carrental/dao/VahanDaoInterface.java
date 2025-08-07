package com.carrental.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.Vahan;

public interface VahanDaoInterface extends JpaRepository<Vahan, Long> {
	
	Optional<Vahan> findByRcNumber(String rcNumber);

}
