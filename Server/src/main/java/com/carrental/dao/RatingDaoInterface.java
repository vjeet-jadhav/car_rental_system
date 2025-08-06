package com.carrental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.entity.Rating;

public interface RatingDaoInterface extends JpaRepository<Rating, Long>{

}
