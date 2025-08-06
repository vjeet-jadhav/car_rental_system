package com.carrental.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.carrental.entity.User;


@Repository
public interface HostDao extends JpaRepository<User, Long> {
	
	
}
