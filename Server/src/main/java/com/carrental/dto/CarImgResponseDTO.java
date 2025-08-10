package com.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarImgResponseDTO {

	private String imgType;
	
    private String imgUrl;
    
    private String publicId;
}
