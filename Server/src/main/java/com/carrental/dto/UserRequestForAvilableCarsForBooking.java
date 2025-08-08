package com.carrental.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserRequestForAvilableCarsForBooking {
	

    @NotNull(message = "Start trip time is required")
    @FutureOrPresent(message = "Start trip must be in the present or future")
    private LocalDateTime startTrip;

    @NotNull(message = "End trip time is required")
    @Future(message = "End trip must be in the future")
    private LocalDateTime endTrip;
}
