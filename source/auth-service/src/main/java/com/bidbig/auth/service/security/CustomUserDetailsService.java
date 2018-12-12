package com.bidbig.auth.service.security;

import com.bidbig.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.bidbig.auth.domain.*;

import java.util.Optional;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> existing = repository.findById(username);
		User user = existing.orElse(null);
		if(user == null) {
			throw new IllegalArgumentException("user doesn't exists: ");
		}

		List<GrantedAuthority> authorities = buildUserAuthority(user.getRoles());
		
		return buildUserForAuthentication(user, authorities);
		//return repository.findById(username).orElseThrow(()->new UsernameNotFoundException(username));
	}

	private List<GrantedAuthority> buildUserAuthority(Set<Role> userRoles) {
		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>(); 
		for(Role userRole  : userRoles){
			setAuths.add(new SimpleGrantedAuthority(userRole.getRole()));
		}	
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>(setAuths);
		return grantedAuthorities;
	}
	
	private UserDetails buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
		//accountNonExpired, credentialsNonExpired, accountNonLocked, authorities properties
		return new org.springframework.security.core.userdetails.User(
          user.getUsername(), user.getPassword(), user.isEnabled(), true, true, 
          true, authorities);
		// return new User(user.getUsername(), user.getPassword(), 
		// user.getEnabled(), true, true, true, authorities);
	}

}
