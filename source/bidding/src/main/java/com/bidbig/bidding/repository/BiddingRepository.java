package com.bidbig.bidding.repository;

import com.bidbig.bidding.domain.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.cache.annotation.Cacheable;

import java.util.List;

@Repository
public interface BiddingRepository extends JpaRepository<Bid, Long> {

    @Cacheable("findAllBidsById")
    public List<Bid> findByItemId(int id);

    public Bid findTopByAuctionIdOrderByAmountDesc(int auctionId);

}
