package com.carrental.exception;

@SuppressWarnings("serial")
public class ApiException extends RuntimeException{
	public ApiException (String msg) {
		super(msg);
	}
}
