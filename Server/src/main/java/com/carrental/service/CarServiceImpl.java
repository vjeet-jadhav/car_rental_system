// CarService.java - placeholder
package com.carrental.service;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.carrental.dao.BookingDaoInterface;
import com.carrental.dao.CarDaoInterface;
import com.carrental.dao.RatingDaoInterface;
import com.carrental.dao.UserDaoInterface;
import com.carrental.dao.VahanDaoInterface;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.ApiResponseWithId;
import com.carrental.dto.CarBookingsDTO;
import com.carrental.dto.CarRegistrationDTO;
import com.carrental.dto.RatingResponseDTO;
import com.carrental.dto.RcValidationResponce;
import com.carrental.entity.Car;
import com.carrental.entity.CarStatus;
import com.carrental.entity.Rating;
import com.carrental.entity.User;
import com.carrental.entity.UserRole;
import com.carrental.entity.UserStatus;
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
	private final HostService hostService;
	private final ModelMapper mapper;
	
	public RcValidationResponce<CarRegistrationDTO> validateCar(String rcNumber) {
		
	    if (carDao.existsByRcNumber(rcNumber)) {
	        return new RcValidationResponce<>(
	            "error",
	            null,
	            "Car with this RC number already exists"
	        );
	    }

	    Vahan car = vahanDao.findByRcNumber(rcNumber);
	    System.out.println(car);
	    
	    if (car == null) {
	        return new RcValidationResponce<>(
	            "error",
	            null,
	            "Car rc number is invalid"
	        );
	    }

	    CarRegistrationDTO dto = mapper.map(car, CarRegistrationDTO.class);

	    return new RcValidationResponce<>(
	        "success",
	        dto,
	        "Vehicle found and ready for registration"
	    );
	}
	

	public ApiResponseWithId registerCar(Long userId, @Valid CarRegistrationDTO carDto) {

	    // Map DTO to entity
	    Car car2 = mapper.map(carDto, Car.class);
	    car2.setId(null);
	    car2.setStatus(CarStatus.NOTVERIFIED);
	    car2.getAddress().setCar(car2);

	    // Car is saved
	    Car savedCar = carDao.save(car2); 
	    
	    // Associate with user and make user a HOST
	    User u = userDao.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
	    u.addHostedCar(savedCar);
	    u.setUserRole(UserRole.HOST);
	    userDao.save(u);

	    // Return message + carId in data
	    Map<String, Object> payload = new HashMap<>();
	    payload.put("carId", savedCar.getId());
	    return new ApiResponseWithId("New Car Added successfully", payload);
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
