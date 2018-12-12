package com.bidbig.notification.service;

import com.bidbig.notification.domain.NotificationType;
import com.bidbig.notification.domain.Recipient;

import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailService {

	void send(NotificationType type, Recipient recipient, String attachment) throws MessagingException, IOException;

	void sendEmail(String subject, String  body, Recipient recipient) throws MessagingException, IOException;

}
