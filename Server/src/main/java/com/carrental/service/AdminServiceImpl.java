package com.carrental.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.carrental.dao.AdminDao;
import com.carrental.dao.BookingDaoInterface;
import com.carrental.dao.CarDaoInterface;
import com.carrental.dao.PaymentDaoInterface;
import com.carrental.dao.UserRemarkInterface;
import com.carrental.dto.AgentResDTO;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.BasicInfoDTO;
import com.carrental.dto.CarResponseDTO;
import com.carrental.dto.PendingCarDto;
import com.carrental.dto.RegisterAgentDTO;
import com.carrental.dto.TopCarsResponseDto;
import com.carrental.dto.UserResponseDto;
import com.carrental.entity.Booking;
import com.carrental.entity.Car;
import com.carrental.entity.CarStatus;
import com.carrental.entity.Rating;
import com.carrental.entity.User;
import com.carrental.entity.UserRemark;
import com.carrental.entity.UserRole;
import com.carrental.entity.UserStatus;
import com.carrental.exception.ApiException;
import com.carrental.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	private final AdminDao adminDao;
	private final CarDaoInterface carDao;
	private final BookingDaoInterface bookingDao;
	private final PaymentDaoInterface paymentDao;
	private ModelMapper mapper;
	private PasswordEncoder passwordEncoder;
	private final UserService userService;
	private final UserRemarkInterface userRemarkDao;

	@Override
	public AgentResDTO register(RegisterAgentDTO dto) {
		// TODO Auto-generated method stub
//		System.out.println(dto.toString());
		if(adminDao.existsByEmail(dto.getEmail()))
			throw new ApiException("Duplicate Email Detected: Agent Exists Already !");
		User entity = mapper.map(dto, User.class);
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity.setUserRole(UserRole.AGENT);
		entity.setUserStatus(UserStatus.ACTIVE);
		return mapper.map(adminDao.save(entity), AgentResDTO.class);
	}

	@Override
	public List<AgentResDTO> getAgents() {
//		System.out.println("here");
		return adminDao.findByUserRoleAndUserStatus(UserRole.AGENT,UserStatus.ACTIVE)
				.stream()
				.map(user -> mapper.map(user, AgentResDTO.class))
				.toList();
	}

	@Override
	public ApiResponse assignAgentToCar(Long carId, Long agentId) {
		
		Car car = carDao.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car with given id is not found !"));
		User agent = adminDao.findById(agentId).orElseThrow(() -> new ResourceNotFoundException("Agent with given id is not found !"));
		car.setAgent(agent);
		car.setStatus(CarStatus.NOTVERIFIED);
		
		return new ApiResponse("Agent Assigned to Car !");
	}

	@Override
	public BasicInfoDTO getBasicInfo() {

		BasicInfoDTO info = new BasicInfoDTO(0, 0, 0, 0, 0, 0.0);
		 info.setTotalCars((int)carDao.count()); 
		 info.setTotalUsers((int)adminDao.count());
		 info.setTotalBookings((int)bookingDao.count());
		 info.setTotalRevenue((double)paymentDao.getTotalAmount());
		 info.setTotalHosts((int)adminDao.findByUserRoleAndUserStatus(UserRole.HOST,UserStatus.ACTIVE).size());
		 
//		 List<TopCarsResponseDto> list = userService.getTopCars();
		 List<TopCarsResponseDto> allCars = getAllCars();

		 int cnt = 0;
		 int sumOfRatings = 0;
		 for(TopCarsResponseDto car: allCars) {
			 if(car.getRating() > 0) {
				 
				 sumOfRatings += car.getRating();
				 cnt += 1;
			 }
		 }
		
		 info.setTotalRating((double)sumOfRatings/cnt);

		return info;
	}

	@Override
	public ApiResponse restrictCarById(Long carId) {

		Car car = carDao.findById(carId).orElseThrow(() -> new ResourceNotFoundException("Car with given id is not found !"));
		car.setStatus(CarStatus.DELETED);
		return new ApiResponse("Car Restricted By Admin");
	}

	@Override
	public ApiResponse restrictUserById(Long userId, String remark) {
		// TODO Auto-generated method stub
		User user = adminDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User with given id is not found !"));
		user.setUserStatus(UserStatus.INACTIVE);
		
		UserRemark userRemark = new UserRemark();
		userRemark.setRemark(remark);
		userRemark.setUser(user);
		
		userRemarkDao.save(userRemark);

		return new ApiResponse("User Restricted By Admin");
	}

	@Override
	public List<PendingCarDto> getPendingCars() {
		// TODO Auto-generated method stub
		return carDao.getByStatus()
				.stream()
				.map(car -> mapper.map(car, PendingCarDto.class))
				.toList();
	}
	
	@Override
	public List<TopCarsResponseDto> getAllCars() {
		
        List<TopCarsResponseDto> responseList = new ArrayList<>();
		
		List<Car> carList = carDao.findAll();
		for(Car car:carList)
		{

			double rating = generateAverageRating(car.getRatingList());

			TopCarsResponseDto obj = new TopCarsResponseDto();
			obj = mapper.map(car, TopCarsResponseDto.class);
			obj.setRating(rating);
			obj.setCarId(car.getId());
			obj.setHostId(car.getHost().getId());
			responseList.add(obj);
		}

		return responseList;
	}
	
	public double generateAverageRating(List<Rating> list)
	{
		double sum=0.0;
		int count = list.size();
		for(Rating r:list)
		{
			sum += r.getRating();
		}
		if(count!=0)
			return (sum/count);
		return sum;
	}

	@Override
	public List<PendingCarDto> getEntireCarInfo() {

		List<PendingCarDto> result = new ArrayList();
		
//		List<Car> carList = carDao.findAll();
		List<Car> carList = carDao.getCarsToRestrict();

		
		for(Car car:carList){

     		double income = car.getBookingList().stream().mapToDouble(booking -> booking.getAmount()).sum();


			PendingCarDto obj = new PendingCarDto();
			obj = mapper.map(car, PendingCarDto.class);
			obj.setRating(generateAverageRating(car.getRatingList()));
			obj.setBookings(car.getBookingList().size() );
            obj.setIncome(income);
			result.add(obj);
		}
		
		return result;
	}

	@Override
	public AgentResDTO getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return mapper.map(adminDao.findByEmail(email), AgentResDTO.class) ;
	}

}
