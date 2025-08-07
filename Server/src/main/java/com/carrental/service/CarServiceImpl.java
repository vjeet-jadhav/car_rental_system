// CarService.java - placeholder
package com.carrental.service;



import java.util.List;


import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.carrental.dao.BookingDaoInterface;
import com.carrental.dao.CarDaoInterface;
import com.carrental.dao.RatingDaoInterface;
import com.carrental.dao.UserDaoInterface;
import com.carrental.dao.VahanDaoInterface;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.CarBookingsDTO;
import com.carrental.dto.CarRegistrationDTO;
import com.carrental.dto.RatingResponseDTO;
import com.carrental.entity.Car;
import com.carrental.entity.CarStatus;
import com.carrental.entity.Rating;
import com.carrental.entity.User;
import com.carrental.entity.Vahan;
import com.carrental.exception.ApiException;
import com.carrental.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CarServiceImpl implements CarService{

	private final CarDaoInterface carDao;
	private final VahanDaoInterface vahanDao;
	private final UserDaoInterface userDao;
	private final RatingDaoInterface ratingDao;
	private final BookingDaoInterface bookingDao;
	private final ModelMapper mapper;
	
	public CarRegistrationDTO validateCar(String rcNumber) {
		
		System.out.println("CarServiceImpl ke validateCar ke under hu Sanket dada...");
		
		System.out.println(rcNumber);
		
		if(carDao.existsByRcNumber(rcNumber))
			throw new ApiException
			("Car with this RC number already exists");
		
		Vahan car = vahanDao.findByRcNumber(rcNumber)
				.orElseThrow(() -> new ApiException("No vehicle found for RC number: " + rcNumber));
							
		return mapper.map(car, CarRegistrationDTO.class);
	}
	

	public ApiResponse registerCar(Long userId, @Valid CarRegistrationDTO car) {
		
		System.out.println("CarServiceImpl ke registerCar ke under hu Sanket dada...");
		
		Car car2 = mapper.map(car,Car.class);
		car2.setId(null);
		car2.setStatus(CarStatus.NOTVERIFIED);
		car2.getAddress().setCar(car2);
		System.out.println("User Id: " + userId);
		
		User u = userDao.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found"));
		u.addHostedCar(car2);
		
		return new ApiResponse("New Car Added successfully ");
	}


	public ApiResponse updateCar(@Valid CarRegistrationDTO car) {
		
		System.out.println("CarServiceImpl ke updateCar ke under hu Sanket dada...");
		Car car2 = carDao.findById(car.getId())
				.orElseThrow(()-> new ResourceNotFoundException("Invalid Car ID : Update failed\""));
		
		mapper.map(car, car2);
		
		return new ApiResponse("Car details updated !");
	}


	public List<RatingResponseDTO> getRatings(Long carId) {
		
		System.out.println("CarServiceImpl ke getRatings ke under hu Sanket dada...");
		List<Rating> ratings = ratingDao.findByCarId(carId)
									.orElseThrow(() -> new ResourceNotFoundException("No ratings for this car are given..."));
		
		System.out.println(ratings.getFirst());
		
		return ratings.stream()
				.map(rating -> mapper.map(rating, RatingResponseDTO.class))
				.toList();
	}


	@Override
	public List<CarBookingsDTO> getBookingsDetails(Long carId) {
		
		List<CarBookingsDTO> bookings = bookingDao.findActiveBookingsByCarId(carId)
											.orElseThrow(()-> new ResourceNotFoundException("No current Bookings found..."));
		return bookings;
	}
	
	
}
