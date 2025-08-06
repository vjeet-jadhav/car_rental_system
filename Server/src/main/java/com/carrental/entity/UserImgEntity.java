package com.carrental.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
public class UserImgEntity extends ImageEntity {
	
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

}
