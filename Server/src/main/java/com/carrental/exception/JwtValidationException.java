package com.carrental.exception;

@SuppressWarnings("serial")
public class JwtValidationException extends RuntimeException {
	
	public JwtValidationException(String message) {
        super(message);
    }

}
