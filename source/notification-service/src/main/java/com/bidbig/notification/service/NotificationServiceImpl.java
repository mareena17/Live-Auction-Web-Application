package com.bidbig.notification.service;

import com.bidbig.notification.client.AccountServiceClient;
import com.bidbig.notification.domain.NotificationType;
import com.bidbig.notification.domain.Recipient;
import com.bidbig.notification.domain.ResetRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.core.env.Environment;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.text.MessageFormat;

@Service
public class NotificationServiceImpl implements NotificationService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private AccountServiceClient client;

	@Autowired
	private RecipientService recipientService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private Environment env;	

	@Override
	@Scheduled(cron = "${backup.cron}")
	public void sendBackupNotifications() {

		final NotificationType type = NotificationType.BACKUP;

		List<Recipient> recipients = recipientService.findReadyToNotify(type);
		log.info("found {} recipients for backup notification", recipients.size());

		recipients.forEach(recipient -> CompletableFuture.runAsync(() -> {
			try {
				String attachment = client.getAccount(recipient.getAccountName());
				emailService.send(type, recipient, attachment);
				recipientService.markNotified(type, recipient);
			} catch (Throwable t) {
				log.error("an error during backup notification for {}", recipient, t);
			}
		}));
	}

	@Override
	@Scheduled(cron = "${remind.cron}")
	public void sendRemindNotifications() {

		final NotificationType type = NotificationType.REMIND;

		List<Recipient> recipients = recipientService.findReadyToNotify(type);
		log.info("found {} recipients for remind notification", recipients.size());

		recipients.forEach(recipient -> CompletableFuture.runAsync(() -> {
			try {
				emailService.send(type, recipient, null);
				recipientService.markNotified(type, recipient);
			} catch (Throwable t) {
				log.error("an error during remind notification for {}", recipient, t);
			}
		}));
	}

	@Override
	public String sendResetNotification(ResetRequest request) {

		NotificationType notif = request.getType();
		String url = request.getUrl();

		Recipient recipient = request.getRecipient();

		final String subject = env.getProperty(notif.getSubject());
		final String text = MessageFormat.format(env.getProperty(notif.getText()), url);

		try {
			emailService.sendEmail(subject, text, recipient);
		} catch(Throwable t) {
			log.error("an error during reset notification for {}", recipient, t);
			return "Failed";
		}

		return "Success";

	}	
}
