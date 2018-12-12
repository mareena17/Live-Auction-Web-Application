package com.bidbig.notification.controller;

import javax.validation.Valid;

import com.bidbig.notification.domain.ResetRequest;
import com.bidbig.notification.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

	@Autowired
	private NotificationService notifService;

	@PreAuthorize("#oauth2.hasScope('server')")
	@RequestMapping(path = "/reset", method = RequestMethod.POST)
	public String sendResetNotification(@Valid @RequestBody ResetRequest request) {
		return notifService.sendResetNotification( request);
	}
	
}
