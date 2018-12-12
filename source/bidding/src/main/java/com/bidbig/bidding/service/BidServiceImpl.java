package com.bidbig.bidding.service;

import com.bidbig.bidding.domain.*;
import com.bidbig.bidding.service.*;
import com.bidbig.bidding.repository.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.core.env.Environment;
import org.joda.time.DateTime;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.text.MessageFormat;

@Service
public class BidServiceImpl implements BidService {

    private final Logger log = LoggerFactory.getLogger(getClass());
    
    @Autowired
	private MessagingService messageService;
	
	@Autowired
	private BiddingRepository bidRepo;


	@Override
	public void createBid(BidMessage bid) {

        messageService.queueBid(bid);

	}
	
	@Override
	public void persistBid(BidMessage bid) {

		Bid newBid = new Bid();
		newBid.setAmount(bid.getAmount());
		newBid.setAuctionId(bid.getAuctionId());
		DateTime created = new DateTime(bid.getCreated());
		newBid.setCreated(created);
		newBid.setItemId(bid.getItemId());
		newBid.setUserId(bid.getUserId());
		newBid.setStatus("PENDING");
		
		bidRepo.save(newBid);

	}

	@Override
	public List<Bid> getBidsByItemId(int itemId) {

		return bidRepo.findByItemId(itemId);

	}

	@Override
	public double findMaxBidByAuctionId(int auctionId) {

		return bidRepo.findTopByAuctionIdOrderByAmountDesc(auctionId).getAmount();

	}
}
