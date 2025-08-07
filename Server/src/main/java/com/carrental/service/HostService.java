package com.carrental.service;

import java.util.List;
import com.carrental.dto.HostTotalEarningDTO;
import com.carrental.dto.CarSheduleDTO;


public interface HostService {

	public Object getMyCars(Long userId);

	public List<HostTotalEarningDTO> getTotalEarnings(Long id);

	public Object sheduleCar(Long carId, CarSheduleDTO carShedule);

	public Object unsheduleCar(Long carId);

	public Object getBookingHistory(Long userId);
}
