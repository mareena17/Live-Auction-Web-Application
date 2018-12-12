package com.bidbig.auction.service;

import com.bidbig.auction.domain.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuctionService {

	void createAuctions(AuctionRequest request);

	void createAuction(Auction request);

	List<Auction> listAuctions(DateRange request);

	Page<Auction> listAuctionsWithItems(DateRange request, Pageable pageable);

	void updateAuction(Auction request);

	Auction currentAuction();
}
