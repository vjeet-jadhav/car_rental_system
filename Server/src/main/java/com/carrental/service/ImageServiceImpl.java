package com.carrental.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.carrental.dao.UserImgInterface;
import com.carrental.dto.ImgResponseDTO;
import com.carrental.entity.UserImgEntity;
import com.carrental.exception.ResourceNotFoundException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class ImageServiceImpl implements ImageService {

	private Cloudinary cloudinary;
	private final UserImgInterface userImgInterface;

	
	public ImgResponseDTO uploadImage(MultipartFile file) throws IOException {
		
		ImgResponseDTO obj = new ImgResponseDTO(null, null, null);
		
		Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder","user"));
		
		obj.setUrl((String) uploadResult.get("secure_url"));
		obj.setPublicId((String) uploadResult.get("public_id"));
		obj.setFormat((String) uploadResult.get("format"));
		
		obj.toString();
		return obj;
	}

	@Override
	public ImgResponseDTO uploadCarImage(MultipartFile file) throws IOException{
		// TODO Auto-generated method stub
		ImgResponseDTO obj = new ImgResponseDTO(null, null, null);
		
		Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder","car"));

		obj.setUrl((String) uploadResult.get("secure_url"));
		obj.setPublicId((String) uploadResult.get("public_id"));
		obj.setFormat((String) uploadResult.get("format"));
		return obj;
	}

	@Override
	public ImgResponseDTO updateImage(MultipartFile file, Long userId) throws IOException{
		// TODO Auto-generated method stub
		ImgResponseDTO obj = new ImgResponseDTO(null, null, null);
		UserImgEntity user = userImgInterface.findByUserId(userId);
		String publicId = user.getPublicId();
		cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
		Map uploadResult = cloudinary.uploader().upload(file.getBytes(),ObjectUtils.asMap( "public_id", publicId,"overwrite", true));

		obj.setUrl((String) uploadResult.get("secure_url"));
		obj.setPublicId((String) uploadResult.get("public_id"));
		obj.setFormat((String) uploadResult.get("format"));
		
		user.setFormat((String) uploadResult.get("format"));
		user.setImgUrl((String) uploadResult.get("secure_url"));
		user.setImgType("profile");
		
		return obj;
	}
}
