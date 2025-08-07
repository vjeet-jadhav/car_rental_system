package com.carrental.dao;



import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.entity.Rating;

public interface RatingDaoInterface extends JpaRepository<Rating, Long> {


//	@Query("SELECT r FROM Rating r ORDER BY r.rating")
//	Optional<List<Rating>> getTopCarList(Pageable pageable);

	Optional<List<Rating>> findByCarId(Long carId);

	@Query("SELECT AVG(r.rating) FROM Rating r WHERE r.car.id = :carId")
	Double findAvgRatingOfCar(Long carId);
	
	@Query("SELECT r FROM Rating r WHERE r.car.id = :carId ORDER BY r.rating DESC")
	List<Rating> findTop5RatingsByCar(Long carId, Pageable pageable);



}
