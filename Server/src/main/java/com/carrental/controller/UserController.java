package com.carrental.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carrental.config.JwtUtils;

import com.carrental.dto.BookingRequestComDto;
import com.carrental.dto.CarFilterRequestDto;
import com.carrental.dto.CarPaymentDto;
import com.carrental.dto.CarReviewDto;
import com.carrental.dto.CombineRequestFilterForFilter;
import com.carrental.dto.ImgResponseDTO;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.UserBookingsDto;
import com.carrental.dto.UserCarBookingDto;
import com.carrental.dto.UserLoginRequestDto;
import com.carrental.service.ImageService;
import com.carrental.service.UserService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserRequestForAvilableCarsForBooking;
import com.carrental.dto.UserUpdateRequestDto;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final ImageService imageService;
	private AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;
	
	@PostMapping("/signup")
	public ResponseEntity<?> RegesterUser(@RequestBody @Valid UserRequestDto userDto) {
		System.out.println(userDto.toString());
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.RegisterUser(userDto));
	}
	
	@PutMapping("/editProfile")
	public ResponseEntity<?> updateUserDetails(@RequestBody UserUpdateRequestDto userDto){
		System.out.println(userDto.toString());
		Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		return ResponseEntity.ok(userService.updateUser(id, userDto));
	}
	
	
	@PostMapping("/signin")
	public String userSignIn(@RequestBody UserLoginRequestDto dto)
	{
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
		System.out.println("before - "+authentication.isAuthenticated());//false);
		
		Authentication validAuthentication = authenticationManager.authenticate(authentication);
		System.out.println(validAuthentication.getPrincipal().getClass());
		System.out.println(validAuthentication.getPrincipal());//UserEntity
		System.out.println("after "+validAuthentication.isAuthenticated());//true
		
//		In case of success , generate JWT n send it to REST client
		return jwtUtils.generateJwtToken(validAuthentication);
	}
	
	
	@PostMapping("/bookingCar")
	public ResponseEntity<?> userCarBooking(@RequestBody BookingRequestComDto requestBookingDto)
	{
		UserCarBookingDto bDto = requestBookingDto.getBookingDto();
		CarPaymentDto pDto = requestBookingDto.getPaymentDto();
		System.out.println(bDto.toString());
		System.out.println(pDto.toString());
		userService.bookCar(bDto,pDto);
//		Booking entity = 
//		System.out.println("sanket   "+dto.toString());
		return ResponseEntity.ok("Booking and payment executed successfully...)");
	}

	@GetMapping("/myBooking")
	public ResponseEntity<?> userBookings()
	{
		List<UserBookingsDto> bookings = userService.getAllBookings();
		return ResponseEntity.status(HttpStatus.OK).body(bookings);
	}
	

	@GetMapping("/topCars")
	public ResponseEntity<?> uiTopCars()
	{
		return ResponseEntity.ok(userService.getTopCars());
	}

	@PostMapping("/review")
	public String submitReview(@RequestBody CarReviewDto reviewDto) {
		
		return userService.addReview(reviewDto);
	}
	

	@PostMapping("/applyFilters")
	public ResponseEntity<?> getCarsByFilter(@RequestBody CombineRequestFilterForFilter combineDto)
	{
		CarFilterRequestDto carFilter = combineDto.getCarFilter();
		UserRequestForAvilableCarsForBooking availableCars = combineDto.getAvailableCars();
		return ResponseEntity.status(HttpStatus.OK).body(userService.allCarsByFilter(carFilter,availableCars));
	}
	
	
	@GetMapping("/review/{carId}")
	public ResponseEntity<?> getTop(@PathVariable Long carId){
		
		return ResponseEntity.ok(userService.top5Reviews(carId));
	}

	
//	APPLYING FILTER ON THE ONLY AVAILABEL CARS
	@GetMapping("getNearByCars/{city}")
	public ResponseEntity<?> getNearByCars(@PathVariable String city){
		return  ResponseEntity.ok(userService.getNearByCars(city));
	}

	@PostMapping("/upload/{userId}")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file , @PathVariable Long userId){
		
		try {
		ImgResponseDTO obj = imageService.uploadImage(file);
		ApiResponse msg = userService.addImage(userId, obj.getUrl(), obj.getPublicId() , obj.getFormat());
		return ResponseEntity.status(HttpStatus.CREATED).body(obj.getUrl());
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed :"+e.getMessage());
		}
	}
	
	@PutMapping("/updateImg/{userId}")
	public ResponseEntity<?> updateUserImage( @PathVariable Long userId, @RequestParam MultipartFile file) {

		try {
		ImgResponseDTO obj = imageService.updateImage(file,userId);
		return ResponseEntity.status(HttpStatus.CREATED).body(obj);
		
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed :"+e.getMessage());
		}
		
	}

	@PostMapping("/uploadMul/{carId}")
	public ResponseEntity<?> uploadMulImages(@RequestParam("files") MultipartFile[] files, @PathVariable Long carId){
		
		System.out.println("UserController ke uploadMulImages ke under hu Sanket dada...");
		List<ImgResponseDTO> urls = new ArrayList<>();
		for(MultipartFile file: files ) {
			
			try {
				ImgResponseDTO obj = imageService.uploadCarImage(file);
				urls.add(obj);
			} catch(Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed :"+e.getMessage());
			}
		}
		ApiResponse msg = userService.addCarImg(carId,urls);
		return ResponseEntity.status(HttpStatus.CREATED).body(urls);

	}
	
//	GET ALL CARS WHICH ARE AVAILABLE FOR BOOKING
	@PostMapping("/serachCar")
	public ResponseEntity<?> getCarForBooking(@RequestBody @Valid UserRequestForAvilableCarsForBooking dto)
	{
		System.out.println(dto.toString());
		return ResponseEntity.ok(userService.getAllAvailableCarsForBooking(dto));
	}
	
//	GET ALL CITY OF CARS
	@GetMapping("/getCarCity")
	public ResponseEntity<?> getCarCity()
	{
		return ResponseEntity.ok(userService.getCityOfCars());
	}
	
	@GetMapping("/getCarServiceArea")
	public ResponseEntity<?> getCarServiceArea(@RequestParam String city)
	{
		System.out.println(city+"city");
		return ResponseEntity.ok(userService.getServiceAreaOfCars());
	}

	@GetMapping("/info")
	public ResponseEntity<?> getUser(){
		Long userId =(Long) SecurityContextHolder.getContext().getAuthentication().getDetails();
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUserDetail(userId));
	}
}
