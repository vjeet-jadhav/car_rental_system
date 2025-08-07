package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.entity.UserImgEntity;

public interface UserImgInterface extends JpaRepository<UserImgEntity, Long> {

	@Query("SELECT u FROM UserImgEntity u WHERE u.user.id = :userId")
	UserImgEntity findByUserId(@Param("userId") Long userId);


}
