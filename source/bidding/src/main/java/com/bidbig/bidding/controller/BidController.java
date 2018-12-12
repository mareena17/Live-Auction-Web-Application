package com.bidbig.bidding.controller;

import javax.validation.Valid;
import java.util.List;

import com.bidbig.bidding.domain.*;
import com.bidbig.bidding.service.BidService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
public class BidController {

	@Autowired
	private BidService bidService;

	@RequestMapping(path = "/new", method = RequestMethod.POST)
	public void newBid(@Valid @RequestBody BidMessage bid) {
		bidService.createBid(bid);
	}
	
	@RequestMapping(path = "/highest/{auctionId}", method = RequestMethod.GET)
	public double highestBid(@PathVariable int auctionId) {
		return bidService.findMaxBidByAuctionId(auctionId);
	}
	
	@RequestMapping(path = "/all/{itemId}", method = RequestMethod.GET)
	public List<Bid> getAllByItemId(@PathVariable int itemId) {
		return bidService.getBidsByItemId(itemId);
	}	
}
