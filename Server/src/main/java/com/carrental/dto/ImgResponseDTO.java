package com.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString(callSuper = true)
public class ImgResponseDTO {
	
	private  String url;
	private String publicId;
	private String format;

}
