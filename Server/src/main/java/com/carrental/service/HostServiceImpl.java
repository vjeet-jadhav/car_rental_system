package com.carrental.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.dao.BookingDaoInterface;
import com.carrental.dao.CarDaoInterface;
import com.carrental.dao.CarImgInterface;
import com.carrental.dao.HostDao;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.CarBookingHistoryDTO;
import com.carrental.dto.CarImgResponseDTO;
import com.carrental.dto.CarRegistrationDTO;
import com.carrental.dto.CarResponceWithOneImgDTO;
import com.carrental.dto.CarResponseDTO;
import com.carrental.dto.HostTotalEarningDTO;
import com.carrental.dto.CarSheduleDTO;
import com.carrental.entity.Car;
import com.carrental.entity.CarStatus;
import com.carrental.entity.Rating;
import com.carrental.entity.User;
import com.carrental.exception.ApiException;
import com.carrental.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class HostServiceImpl implements HostService {

	private final HostDao hostDao;
	private final CarDaoInterface carDao;
	private final BookingDaoInterface bookingDao;
	private final CarImgInterface carImdDao;
	private final ModelMapper mapper;
	

	
	public List<CarResponceWithOneImgDTO> getMyCars(Long userId) {
		
		//Taking host with is cars by custom query
		List<Car> cars = carDao.findByHostId(userId);
		
		System.out.println("HostService Implimentation ke getMycars ke under hu padul saheb...");
		
		List<CarResponceWithOneImgDTO> list= cars.stream()
			       .map(car -> {
			           // 1) Map all the scalar and address fields
			    	   CarResponceWithOneImgDTO dto = mapper.map(car, CarResponceWithOneImgDTO.class);

			           // 2) Compute the average rating (0 if no ratings)
			           double avg = car.getRatingList()
			                           .stream()
			                           .mapToInt(rating -> rating.getRating())
			                           .average()
			                           .orElse(0.0);
			           
			           // Round or truncate as you prefer
			           dto.setRating(avg);

			           return dto;
			       })
			       .collect(Collectors.toList());
		
		for(CarResponceWithOneImgDTO dto : list)
		{
			CarImgResponseDTO img = carImdDao.findMainImageByCarId(dto.getId());
			dto.setImage(img);
		}
		
		
		return list;
	}
	
	@Override
	public CarResponseDTO getMyOnecar(Long carId) {
		
		System.out.println("HostService Implimentation ke getMyOnecar ke under hu padul saheb...");
		
		Car car = carDao.findById(carId)
					.orElseThrow(() -> new ApiException("Invalid CarId..."));
		
		CarResponseDTO carDTO = mapper.map(car, CarResponseDTO.class);
		
		carDTO.setImagelist(carImdDao.findOrderedImagesByCarId(carId));
		
		return carDTO;
	}
	


	@Override
	public List<HostTotalEarningDTO> getTotalEarnings(Long id) {
		return bookingDao.getTotalEarnings(id);
	}

	public ApiResponse sheduleCar(Long carId, CarSheduleDTO carShedule) 
	{
		System.out.println("HostService Implimentation ke sheduleCar ke under hu padul saheb...");
		
		Car car = carDao.findById(carId)
					.orElseThrow(()-> new ApiException("car id is invalid..."));
		
		car.setSheduledFrom(carShedule.getSheduledFrom());
		car.setSheduledTill(carShedule.getSheduledTill());
		
		if(car.getStatus() != CarStatus.NOTVERIFIED)
		{
			car.setStatus(CarStatus.AVAILABLE);
		}
		
		return new ApiResponse("Car Sheduled successfully !");
	}


	@Override
	public ApiResponse unsheduleCar(Long carId) {
		
		System.out.println("HostService Implimentation ke unsheduleCar ke under hu padul saheb...");
		
		Car car = carDao.findById(carId)
					.orElseThrow(()-> new ApiException("car id is invalid..."));
		
		car.setSheduledFrom(null);
		car.setSheduledTill(null);
		if(car.getStatus() != CarStatus.NOTVERIFIED)
		{
			car.setStatus(CarStatus.VERIFIED);
		}
		return new ApiResponse("Car Unsheduled Successfully");
	}


	@Override
	public List<CarBookingHistoryDTO> getBookingHistory(Long userId) {
		
		List<CarBookingHistoryDTO> bookings = bookingDao.findHistoryByClientId(userId)
												.orElseThrow(()-> new ResourceNotFoundException("No bookings for this car till now"));
		
		return bookings;
	}
	
	
}
