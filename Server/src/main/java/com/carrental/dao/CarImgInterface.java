package com.carrental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.dto.CarImgResponseDTO;
import com.carrental.entity.CarImgEntity;

public interface CarImgInterface extends JpaRepository<CarImgEntity, Long> {

	@Query("""
		      select new com.carrental.dto.CarImgResponseDTO(
		          i.imgType, i.imgUrl, i.publicId
		      )
		      from CarImgEntity i
		      where i.car.id = :carId
		      order by
		        case
		          when lower(i.imgType) = 'main' then 1
		          when lower(i.imgType) = 'front' then 2
		          when lower(i.imgType) = 'back' then 3
		          when lower(i.imgType) = 'left' then 4
		          when lower(i.imgType) = 'right' then 5
		          else 99
		        end
		      """)
	List<CarImgResponseDTO> findOrderedImagesByCarId(@Param("carId") Long carId);
}
