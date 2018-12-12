package com.bidbig.bidding.messaging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import com.bidbig.bidding.domain.BidMessage;

import com.bidbig.bidding.service.BidService;


@Service
public class MessageListener {

	private static final Logger log = LoggerFactory.getLogger(MessageListener.class);
	
	@Autowired
	private BidService bidService;
   
    @RabbitListener(queues = "${exchange.messageQueue}")
    public void receiveMessageForBid(final BidMessage msg) {
    	log.info("Received message: {} from msg queue.", msg);
		bidService.persistBid(msg);

    }



}