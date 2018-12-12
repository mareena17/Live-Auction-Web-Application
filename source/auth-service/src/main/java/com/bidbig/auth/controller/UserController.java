package com.bidbig.auth.controller;

import com.bidbig.auth.domain.ResetPassword;
import com.bidbig.auth.domain.User;
import com.bidbig.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/current", method = RequestMethod.GET)
	public Principal getUser(Principal principal) {
		return principal;
	}

	@RequestMapping(value = "/reset", method = RequestMethod.POST)
	public void resetPassword(@Valid @RequestBody User user) {
		userService.resetPassword(user);
	}

	@RequestMapping(value = "/resetted", method = RequestMethod.POST)
	public void resettedPassword(@Valid @RequestBody ResetPassword resetPassword) {
		userService.resettedPassword(resetPassword);
	}

	@PreAuthorize("#oauth2.hasScope('server')")
	@RequestMapping(method = RequestMethod.POST)
	public void createUser(@Valid @RequestBody User user) {
		userService.create(user);
	}
}
