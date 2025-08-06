package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.UserImgEntity;

public interface UserImgInterface extends JpaRepository<UserImgEntity, Long> {

}
