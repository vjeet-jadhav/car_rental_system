package com.carrental.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponseWithId {
 private String message;
 private Object data; // optional payload (e.g. carId, object)

 public ApiResponseWithId(String message) {
     this.message = message;
 }

}
