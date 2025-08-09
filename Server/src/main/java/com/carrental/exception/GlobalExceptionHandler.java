// GlobalExceptionHandler.java - placeholder
package com.carrental.exception;

import javax.security.auth.login.AccountExpiredException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.carrental.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> handelApiException(ApiException e){
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(e.getMessage()));
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handelResourceNotFoundException(ResourceNotFoundException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
	}
	
	//TO HANDLE AUTHENTICATION FAILURE
	@ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException ex) {
        String message;

        if (ex instanceof BadCredentialsException) {
            message = "Invalid email or password";
        } else {
            message = "Authentication failed: " + ex.getMessage();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
    }
	
//	to handle global exception
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e)
	{
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiException(e.getMessage()));
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<?> handelUserNotFoundException(UserNotFoundException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
	}
}
