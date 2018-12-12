package com.bidbig.notification.service;

import com.bidbig.notification.domain.NotificationType;
import com.bidbig.notification.domain.Recipient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.text.MessageFormat;

@Service
@RefreshScope
public class EmailServiceImpl implements EmailService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private Environment env;

	@Override
	public void send(NotificationType type, Recipient recipient, String attachment) throws MessagingException, IOException {

		final String subject = env.getProperty(type.getSubject());
		final String text = MessageFormat.format(env.getProperty(type.getText()), recipient.getAccountName());

		MimeMessage message = mailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(recipient.getEmail());
		helper.setSubject(subject);
		helper.setText(text);

		if (StringUtils.hasLength(attachment)) {
			helper.addAttachment(env.getProperty(type.getAttachment()), new ByteArrayResource(attachment.getBytes()));
		}

		mailSender.send(message);

		log.info("{} email notification has been send to {}", type, recipient.getEmail());
	}

	@Override
	public void sendEmail(String subject, String body, Recipient recipient) throws MessagingException, IOException {

		MimeMessage message = mailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(recipient.getEmail());
		helper.setSubject(subject);
		helper.setText(body);

		// if (StringUtils.hasLength(attachment)) {
		// 	helper.addAttachment(env.getProperty(type.getAttachment()), new ByteArrayResource(attachment.getBytes()));
		// }

		mailSender.send(message);

		log.info("{} email reset password notification has been send to {}", recipient.getEmail());
	}
	
}
