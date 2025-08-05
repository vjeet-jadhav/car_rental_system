package com.carrental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.User;
import com.carrental.entity.UserRole;

public interface AdminDao extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);

	List<User> findByUserRole(UserRole AGENT);

}
