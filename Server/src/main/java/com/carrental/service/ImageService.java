package com.carrental.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.carrental.dto.ImgResponseDTO;

public interface ImageService {

	ImgResponseDTO uploadImage(MultipartFile file) throws IOException;

	ImgResponseDTO uploadCarImage(MultipartFile file) throws IOException;

	ImgResponseDTO updateImage(MultipartFile file, Long userId) throws IOException;

}
