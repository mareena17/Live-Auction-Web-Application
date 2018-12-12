package com.bidbig.bidding.service;

import com.bidbig.bidding.domain.*;

import java.util.List;

public interface BidService {

	void createBid(BidMessage bid);

	void persistBid(BidMessage bid);

	List<Bid> getBidsByItemId(int itemId);

	double findMaxBidByAuctionId(int auctionId);
}
