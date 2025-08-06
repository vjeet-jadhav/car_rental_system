package com.carrental.service;

import java.time.LocalDate;

import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.dao.BookingDaoInterface;
import com.carrental.dao.CarDaoInterface;
import com.carrental.dao.RatingDaoInterface;
import com.carrental.dao.UserDaoInterface;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.TopCarsResponseDto;
import com.carrental.dto.UserBookingsDto;
import com.carrental.dto.UserCarBookingDto;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserResponseDto;
import com.carrental.dto.UserUpdateRequestDto;
import com.carrental.entity.Booking;
import com.carrental.entity.Car;
import com.carrental.entity.Rating;
import com.carrental.entity.User;
import com.carrental.entity.UserRole;
import com.carrental.entity.UserStatus;
import com.carrental.exception.ApiException;
import com.carrental.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserDaoInterface userDaoInterface;
	private CarDaoInterface carDao;
	private BookingDaoInterface bookingDao;
	private RatingDaoInterface ratingDao;
	private ModelMapper modelMapper;
	private PasswordEncoder password;

	@Override
	public UserResponseDto RegisterUser(UserRequestDto userDto) {
		if(userDaoInterface.existsByEmail(userDto.getEmail()))
			throw new ApiException("Duplicate Email Found....... User Already Exist");
		User user = modelMapper.map(userDto, User.class);
		user.setPassword(password.encode(userDto.getPassword()));
		user.setUserRole(UserRole.USER);
		user.setUserStatus(UserStatus.ACTIVE);
		return modelMapper.map(userDaoInterface.save(user), UserResponseDto.class);
	}

	@Override
	public ApiResponse updateUser(Long Id, UserUpdateRequestDto userDto) {
		
		User user = userDaoInterface.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Invaild User ID : Update Failed"));
		modelMapper.map(userDto, user);
		return new ApiResponse("User Successfully Updated");
	}

	@Override
	public String bookCar(UserCarBookingDto dto) {
		
		User user = userDaoInterface.findById(dto.getClient()).orElseThrow(()-> new ResourceNotFoundException("Invaild User ID...:)"));
		Car car = carDao.findById(dto.getCar()).orElseThrow(()-> new ResourceNotFoundException("Invaild Car ID...:)"));
		User host = userDaoInterface.findById(dto.getHost()).orElseThrow(()-> new ResourceNotFoundException("Invaild Host ID...:)"));
		Booking entity = modelMapper.map(dto, Booking.class);
		entity.setBookingdate(LocalDate.now());
		entity.setCar(car);
		entity.setClient(user);
		entity.setHost(host);
		bookingDao.save(entity);
		return "Booking successfully";
	}

	@Override
	public List<UserBookingsDto> getAllBookings() {
		Long id =(Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		System.out.println("user id is"+id);
		User user = userDaoInterface.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invaild User ID/Not a Valid User"));
			
		List<Booking> bookingList = userDaoInterface.fetchAllBooking(id);
		List<UserBookingsDto> list = bookingList.stream().map(booking -> {
					UserBookingsDto dto = new UserBookingsDto();
					dto.setFirstName(booking.getHost().getFirstName());
					dto.setLastName(booking.getHost().getLastName());
					dto.setBrand(booking.getCar().getBrand());
					dto.setCarModel(booking.getCar().getCarModel());
					dto.setDailyRate(booking.getCar().getDailyRate());
					dto.setBookingStatus(booking.getBookingStatus());
//					payment status remaining
					dto.setStartTrip(booking.getStartTrip());
					dto.setEndTrip(booking.getEndTrip());
					return dto;
		}).toList();
		
		return list.stream().map(booking -> modelMapper.map(booking, UserBookingsDto.class)).toList();
	}

	@Override
	public List<TopCarsResponseDto> getTopCars() {
		
		List<Rating> list =ratingDao.getTopCarList(PageRequest.of(0, 3)).orElseThrow(()-> new ResourceNotFoundException("empty feedback table"));
		
		return list.stream()
				.map(rating -> {
					TopCarsResponseDto dto = new TopCarsResponseDto();
					dto.setBrand(rating.getCar().getBrand());
					dto.setCarModel(rating.getCar().getCarModel());
					dto.setFuelType(rating.getCar().getFuelType());
					dto.setRating(rating.getRating());
					dto.setSeatCapacity(rating.getCar().getSeatCapacity());
					dto.setStatus(rating.getCar().getStatus());
					dto.setTransmissionType(rating.getCar().getTransmissionType());
					dto.setDailyRate(rating.getCar().getDailyRate());
					return dto;
				}).toList();
	}

	
	
}
