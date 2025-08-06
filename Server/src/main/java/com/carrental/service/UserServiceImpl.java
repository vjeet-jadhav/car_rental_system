package com.carrental.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.dao.BookingDaoInterface;
import com.carrental.dao.CarDao;
import com.carrental.dao.CarDaoInterface;

import com.carrental.dao.PaymentDaoInterface;
import com.carrental.dao.RatingDaoInterface;

import com.carrental.dao.CarImgInterface;

import com.carrental.dao.UserDaoInterface;
import com.carrental.dao.UserImgInterface;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.CarPaymentDto;
import com.carrental.dto.CarReviewDto;
import com.carrental.dto.Top5RatingResponseDto;
import com.carrental.dto.TopCarsResponseDto;
import com.carrental.dto.UserBookingsDto;
import com.carrental.dto.UserCarBookingDto;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserResponseDto;
import com.carrental.dto.UserUpdateRequestDto;
import com.carrental.entity.Booking;
import com.carrental.entity.BookingStatus;
import com.carrental.entity.Car
import com.carrental.entity.CarStatus;
import com.carrental.entity.Payment;
import com.carrental.entity.PaymentStatus;
import com.carrental.entity.Rating;

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
	private RatingDaoInterface ratingDao;
	private ModelMapper modelMapper;
	private PasswordEncoder password;

	private PaymentDaoInterface paymentDao;

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
	
//	Booking a Car

	@Override
	public void bookCar(UserCarBookingDto dto,CarPaymentDto pDto) {
		
		User user = userDaoInterface.findById(dto.getClient()).orElseThrow(()-> new ResourceNotFoundException("Invaild User ID...:)"));
		Car car = carDao.findById(dto.getCar()).orElseThrow(()-> new ResourceNotFoundException("Invaild Car ID...:)"));
		User host = userDaoInterface.findById(dto.getHost()).orElseThrow(()-> new ResourceNotFoundException("Invaild Host ID...:)"));
		
//		Adding booking details
		
		Booking entity = modelMapper.map(dto, Booking.class);
		entity.setBookingdate(LocalDate.now());
		entity.setCar(car);
		entity.setClient(user);
		entity.setHost(host);
		entity.setBookingStatus(BookingStatus.CONFIRMED);
		bookingDao.save(entity);
//		on successful booking car status need to update
		car.setStatus(CarStatus.BOOKED);
		
//	    storing the payment details
		
		Payment pEntity = modelMapper.map(pDto, Payment.class);
		
		pEntity.setBookingId(entity);
		pEntity.setPaymentStatus(PaymentStatus.COMPLETED);
		pEntity.setPaymentTime(LocalDateTime.now());
		
		paymentDao.save(pEntity);
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
					
//					getting the payment status
					Long bookingId = booking.getId();
					Payment obj = paymentDao.findByBookingId(bookingId).orElseThrow(()-> new ResourceNotFoundException("payment not done"));
					System.out.println("payment obj"+obj);
					dto.setPaymentStatus(obj.getPaymentStatus());
					
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

	@Override
	public String addReview(CarReviewDto reviewDto) {
		
		Long userId =(Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		
		User user = userDaoInterface.findById(userId).orElseThrow();
		
		Car car = carDao.findById(reviewDto.getCar()).orElseThrow();
		
		Rating rating = modelMapper.map(reviewDto, Rating.class);
		
		rating.setCar(car);
		
		rating.setClient(user);
		
		ratingDao.save(rating);
		
		return "Review Successfully Added";
	}

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
  
	@Override
	public Top5RatingResponseDto top5Reviews(Long carId) {
		if(!carDao.existsById(carId)) {
			throw new ResourceNotFoundException("Car not found with id " + carId);
//	        throw new CarNotFoundException("Car not found with id " + carId);
	    }

	    Double average = ratingDao.findAvgRatingOfCar(carId);
	    Pageable pageable = PageRequest.of(0, 5);

	    List<String> feedbacks = ratingDao.findTop5RatingsByCar(carId, pageable)
	        .stream()
	        .map(Rating::getFeedback)
	        .collect(Collectors.toList());

	    Top5RatingResponseDto dto = new Top5RatingResponseDto();
	    dto.setRating(average);
	    dto.setFeedback(feedbacks);
	    return dto;
	}
	
}
