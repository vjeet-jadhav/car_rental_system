package com.carrental.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carrental.config.JwtUtils;

import com.carrental.dto.BookingRequestComDto;
import com.carrental.dto.CarPaymentDto;
import com.carrental.dto.CarReviewDto;
import com.carrental.dto.ApiResponse;
import com.carrental.dto.Top5RatingResponseDto;
import com.carrental.dto.UserBookingsDto;
import com.carrental.dto.UserCarBookingDto;
import com.carrental.dto.UserLoginRequestDto;
import com.carrental.service.ImageService;
import com.carrental.service.UserService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.carrental.dto.UserRequestDto;
import com.carrental.dto.UserUpdateRequestDto;
import com.carrental.entity.Booking;

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
	
	@PutMapping("/editProfile/{userId}")
	public ResponseEntity<?> updateUserDetails(@PathVariable Long userId, @RequestBody UserUpdateRequestDto userDto){
		System.out.println(userDto.toString());
		return ResponseEntity.ok(userService.updateUser(userId, userDto));
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
		return ResponseEntity.ok("Booking and payment in process");
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
	
	@GetMapping("/review/{carId}")
	public ResponseEntity<?> getTop(@PathVariable Long carId){
		
		return ResponseEntity.ok(userService.top5Reviews(carId));
	}


	
	
	
	
	
	
	
	@PostMapping("/upload/{userId}")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file , @PathVariable Long userId){
		
		try {
		String imgUrl = imageService.uploadImage(file);
		ApiResponse msg = userService.addImage(userId, imgUrl);
		return ResponseEntity.status(HttpStatus.CREATED).body(imgUrl);
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed :"+e.getMessage());
		}
	}
	
	
	
	@PostMapping("/uploadMul/{carId}")
	public ResponseEntity<?> uploadMulImages(@RequestParam("files") MultipartFile[] files, @PathVariable Long carId){
		
		List<String> urls = new ArrayList<>();
		
		for(MultipartFile file: files ) {
			
			try {
				
				String url = imageService.uploadCarImage(file);
				urls.add(url);
			} catch(Exception e) {
				
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed :"+e.getMessage());

			}
		}
		
		ApiResponse msg = userService.addCarImg(carId,urls);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(urls);

	}
	

}
