package com.carrental.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CarSheduleDTO {

	@Future(message = "Start date must be in the future")
	@NotNull
	private LocalDate sheduledFrom;
	
	@Future(message = "End date must be in the future")
	@NotNull
	private LocalDate sheduledTill;
	
	
	@AssertTrue(message="End date must not be before start date")
	public boolean isEndAfterOrEqualStart()
	{
	    return !sheduledTill.isBefore(sheduledFrom);
	}
	
	
	public CarSheduleDTO()
	{
		
	}
	
}
