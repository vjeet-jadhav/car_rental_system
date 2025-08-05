package com.carrental.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.User;

public interface UserDaoInterface extends JpaRepository<User, Long>{


	boolean existsByEmail(String email);


	Optional<User> findByEmail(String email);

}
