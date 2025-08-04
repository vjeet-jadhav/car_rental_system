package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.User;

public interface UserDaoInterface extends JpaRepository<User, Long>{
	boolean existsByEmail(String email);
}
