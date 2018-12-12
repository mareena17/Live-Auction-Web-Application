package com.bidbig.bidding.service;

import com.bidbig.bidding.domain.BidMessage;
import com.bidbig.bidding.messaging.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.text.MessageFormat;

@Service
public class MessagingServiceImpl implements MessagingService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private MessageSender sender;

    @Value("${exchange.name}")
    private String exchange;
    
    @Value("${exchange.messageRoutingKey}")
	private String msgRKey;


	@Override
	public void queueBid(BidMessage bid) {


        sender.sendMessage(rabbitTemplate, exchange, msgRKey, bid);
		// NotificationType notif = request.getType();
		// String url = request.getUrl();

		// Recipient recipient = request.getRecipient();

		// final String subject = env.getProperty(notif.getSubject());
		// final String text = MessageFormat.format(env.getProperty(notif.getText()), url);

		// try {
		// 	emailService.sendEmail(subject, text, recipient);
		// } catch(Throwable t) {
		// 	log.error("an error during reset notification for {}", recipient, t);
		// 	return "Failed";
		// }

		// return "Success";

	}	
}
