package com.bidbig.bidding.service;

import com.bidbig.bidding.domain.*;

public interface MessagingService {

	void queueBid(BidMessage bid);

}
