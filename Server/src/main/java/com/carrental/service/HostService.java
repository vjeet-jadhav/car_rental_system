package com.carrental.service;

import java.util.List;

import com.carrental.dto.HostTotalEarningDTO;

public interface HostService {

	public Object getMyCars(Long userId);

	public List<HostTotalEarningDTO> getTotalEarnings(Long id);
}
