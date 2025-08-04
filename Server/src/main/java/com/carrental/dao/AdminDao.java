package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.User;

public interface AdminDao extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);

}
