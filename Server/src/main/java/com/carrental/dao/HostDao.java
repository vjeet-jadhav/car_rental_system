package com.carrental.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.carrental.entity.User;


@Repository
public interface HostDao extends JpaRepository<User, Long> {
	
	@Query("select u from User u left join fetch u.hostedCars where u.id=:userId")
	public Optional<User> getMyCars(Long userId);
}
