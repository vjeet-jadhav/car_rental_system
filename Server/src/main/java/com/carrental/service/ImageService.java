package com.carrental.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

	String uploadImage(MultipartFile file) throws IOException;

	String uploadCarImage(MultipartFile file) throws IOException;

}
