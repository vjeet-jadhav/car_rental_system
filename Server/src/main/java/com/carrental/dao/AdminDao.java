package com.carrental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.User;
import com.carrental.entity.UserRole;
import com.carrental.entity.UserStatus;

public interface AdminDao extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);

	List<User> findByUserRole(UserRole role);

	List<User> findByUserRoleAndUserStatus(UserRole agent, UserStatus active);

}
