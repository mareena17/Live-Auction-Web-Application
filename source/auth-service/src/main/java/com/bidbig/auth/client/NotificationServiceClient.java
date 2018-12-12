package com.bidbig.auth.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bidbig.auth.domain.*;


@FeignClient(name = "notification-service", url = "https://notification-service:8000")
public interface NotificationServiceClient {

	@RequestMapping(method = RequestMethod.POST, value = "/notifications/reset", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	String sendPasswordReset(ResetRequest req);

}
