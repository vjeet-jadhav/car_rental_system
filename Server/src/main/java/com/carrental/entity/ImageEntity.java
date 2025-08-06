package com.carrental.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@MappedSuperclass
public class ImageEntity extends BaseEntity {
	
	@Column(nullable = false, length = 30, name = "type")
	private String imgType;
	
	@Column(nullable = false, length = 100, name = "url")
	private String imgUrl;

}
