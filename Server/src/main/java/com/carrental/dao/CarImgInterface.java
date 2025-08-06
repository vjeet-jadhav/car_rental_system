package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.CarImgEntity;

public interface CarImgInterface extends JpaRepository<CarImgEntity, Long> {

}
