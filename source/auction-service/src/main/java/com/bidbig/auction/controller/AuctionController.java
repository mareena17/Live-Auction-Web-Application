package com.bidbig.auction.controller;

import javax.validation.Valid;

import com.bidbig.auction.domain.AuctionRequest;
import com.bidbig.auction.domain.DateRange;
import com.bidbig.auction.domain.Auction;
import com.bidbig.auction.service.AuctionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hazelcast.core.HazelcastInstance;

import java.util.List;

@RestController
public class AuctionController {

	@Autowired
	private AuctionService auctionService;

	@Autowired
	HazelcastInstance hazelInstance;

	@RequestMapping(path = "/create", method = RequestMethod.POST)
	public void createAuction(@Valid @RequestBody AuctionRequest request) {
		auctionService.createAuctions( request);
	}

	@RequestMapping(path = "/createsingle", method = RequestMethod.POST)
	public void createAuction(@Valid @RequestBody Auction request) {
		auctionService.createAuction( request);
	}
	
	@RequestMapping(path = "/list", method = RequestMethod.POST)
	public List<Auction> listAuction(@Valid @RequestBody DateRange request) {
		return auctionService.listAuctions(request);
	}

	@RequestMapping(path = "/item/list", method = RequestMethod.POST)
	public Page<Auction> listAuctionWithItem(@Valid @RequestBody DateRange request, Pageable pageable) {
		return auctionService.listAuctionsWithItems(request, pageable);
	}	

	@RequestMapping(path = "/current", method = RequestMethod.GET)
	public Auction currentAuction() {
		return auctionService.currentAuction();
	}

	@RequestMapping(path = "/update", method = RequestMethod.POST)
	public void updateAuction(@Valid @RequestBody Auction request) {
		auctionService.updateAuction( request);
	}	
}
