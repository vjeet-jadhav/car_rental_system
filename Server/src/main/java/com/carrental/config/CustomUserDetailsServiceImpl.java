package com.carrental.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.carrental.dao.UserDao;
import com.carrental.dao.UserDaoInterface;
import com.carrental.entity.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	
	private UserDaoInterface userDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		System.out.println("CustomUserDetailsServiceImpl ke ander hu..:)");
		User user = userDao.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid Email !!"));
		return user;
	}

}
