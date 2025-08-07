package com.carrental.service;

import com.carrental.dto.CarSheduleDTO;

public interface HostService {

	public Object getMyCars(Long userId);

	public Object sheduleCar(Long carId, CarSheduleDTO carShedule);

	public Object unsheduleCar(Long carId);

	public Object getBookingHistory(Long userId);
}
