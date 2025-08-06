package com.carrental.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

	private Cloudinary cloudinary;
	
	public String uploadImage(MultipartFile file) throws IOException {
		
		Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder","user"));
		
		return (String) uploadResult.get("secure_url");
	}

	@Override
	public String uploadCarImage(MultipartFile file) throws IOException{
		// TODO Auto-generated method stub
		
		Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder","car"));

		return (String) uploadResult.get("secure_url");
	}
}
