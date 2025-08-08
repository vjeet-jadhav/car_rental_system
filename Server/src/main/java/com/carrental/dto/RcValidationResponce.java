package com.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RcValidationResponce<T> {

	private String status;        // e.g. "success" or "error"
    private T data;               // your actual DTO
    private String message;
    
    public RcValidationResponce()
    {
    	
    }
}
