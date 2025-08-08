package com.carrental.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.carrental.dao.AgentDao;
import com.carrental.dto.CarHistoryDTO;
import com.carrental.entity.Car;
import com.carrental.entity.CarStatus;
import com.carrental.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AgentServiceImpl implements AgentService {
	private AgentDao agentDao;
	 private EmailService emailService;
	 
	@Override
	public List<CarHistoryDTO> getAgentHistory(Long agentId) {
		
		return agentDao.findHistoryByAgentId(agentId);
	}

	@Override
	public List<CarHistoryDTO> getAgentVerificationList(Long agentId) {
		return agentDao.findPendingRequestsByAgentId(agentId);
	}

	@Override
	public void verifyCar(Long carId, String newStatus) {
		Car car = agentDao.findById(carId).
				orElseThrow(()-> new ResourceNotFoundException("Car Not Found With id" + carId));
		
		car.setStatus(CarStatus.VERIFIED);
		agentDao.save(car);
		
		
		String hostEmail = car.getHost().getEmail(); // Adjust based on your entity model
		String carNumber = car.getCarNumber();

		
		String subject = "Your Vehicle Verification is Complete";

		String body = "<html>" +
		              "<body style='font-family: Arial, sans-serif; color: #333;'>" +
		              "<p>Dear " + car.getHost().getFirstName() + ",</p>" +
		              "<p>We are pleased to inform you that your vehicle ( Car Number: <strong>" + carNumber + "</strong>) has successfully passed our verification process.</p>" +
		              "<p>You can now proceed to host your car on <strong>Drivana</strong> and make it available for rental.</p>" +
		              "<p>To get started, simply log in to your account and complete your listing details.</p>" +
		              "<br>" +
		              "<p>If you have any questions or need assistance, feel free to reach out to our support team.</p>" +
		              "<br>" +
		              "<p>Warm regards,<br>" +
		              "The Drivana Team</p>" +
		              "</body>" +
		              "</html>";

	    // Send email notification
	    emailService.sendEmail(hostEmail, subject, body);
	}
	

	@Override
	public void rejectcar(Long carId) {
		Car car = agentDao.findById(carId)
				.orElseThrow(()-> new ResourceNotFoundException("Car Not Found with id " + carId));
		car.setStatus(CarStatus.REJECTED);
		agentDao.save(car);
						
	}

}
