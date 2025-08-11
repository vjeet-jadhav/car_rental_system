package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.UserRemark;

public interface UserRemarkInterface extends JpaRepository<UserRemark, Long> {

}
