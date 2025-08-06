package com.carrental.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.config.JwtUtils;
import com.carrental.dao.BookingDaoInterface;
import com.carrental.dao.CarDao;
import com.carrental.dao.CarDaoInterface;
import com.carrental.dao.CarImgInterface;
import com.carrental.dao.UserDaoInterface;
import com.carrental.dao.UserImgInterface;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.UserBookingsDto;
import com.carrental.dto.UserCarBookingDto;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserResponseDto;
import com.carrental.dto.UserUpdateRequestDto;
import com.carrental.entity.Booking;
import com.carrental.entity.Car;
import com.carrental.entity.CarImgEntity;
import com.carrental.entity.User;
import com.carrental.entity.UserImgEntity;
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
	private ModelMapper modelMapper;
	private PasswordEncoder password;
	private JwtUtils jwtUtil;
	private final UserImgInterface userImgInterface;
	private final CarImgInterface carImgInterface;

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
		
		User user = userDaoInterface.findById(dto.getClient()).orElseThrow();
		Car car = carDao.findById(dto.getCar()).orElseThrow();
		User host = userDaoInterface.findById(dto.getHost()).orElseThrow();
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
	public ApiResponse addImage(Long userId, String imgUrl) {
		// TODO Auto-generated method stub
		User user = userDaoInterface.getById(userId);
		UserImgEntity entity = new UserImgEntity();
		entity.setUser(user);
		entity.setImgType("profile");
		entity.setImgUrl(imgUrl);
		userImgInterface.save(entity);
		return new ApiResponse("Profile Uploaded Successfully !");
	}

	@Override
	public ApiResponse addCarImg(Long carId, List<String> urls) {
		// TODO Auto-generated method stub
		Car car = carDao.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car not found for given id !"));
		
		for(int i = 0 ; i < urls.size(); i++) {
			CarImgEntity entity1 = new CarImgEntity();
			entity1.setCar(car);
			
			if(i == 0) {
				entity1.setImgType("front");
				entity1.setImgUrl(urls.get(i));
			}else if (i == 1) {
				entity1.setImgType("back");
				entity1.setImgUrl(urls.get(i));
			}else if (i == 2) {
				entity1.setImgType("left");
				entity1.setImgUrl(urls.get(i));
			}else if (i == 3) {
				entity1.setImgType("right");
				entity1.setImgUrl(urls.get(i));
			}else if (i == 4) {
				entity1.setImgType("top");
				entity1.setImgUrl(urls.get(i));
			}
			
			carImgInterface.save(entity1);
			
		}
		
		return new ApiResponse("Car Images Added Successfully !");
	}
	
}
