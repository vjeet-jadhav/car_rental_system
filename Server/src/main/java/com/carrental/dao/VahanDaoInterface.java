package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.Vahan;

public interface VahanDaoInterface extends JpaRepository<Vahan, Long> {
	
	Vahan findByRcNumber(String rcNumber);

}
