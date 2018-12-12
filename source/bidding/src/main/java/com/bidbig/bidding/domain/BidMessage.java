package com.bidbig.bidding.domain;

import java.io.Serializable;
import java.util.Date;

import org.springframework.beans.factory.annotation.Required;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import org.hibernate.annotations.Type;

public final class BidMessage implements Serializable{

	private static final long serialVersionUID = 1L;

	@JsonProperty("userId")
    private String userId;
	
	@JsonProperty("auctionId")
    private int auctionId;
	
	@JsonProperty("itemId")
	private int itemId;

	@JsonProperty("amount")
	private double amount;

	@JsonProperty("created")
	private Date created;

    // Default constructor is needed to de-serialize JSON
    public BidMessage() {
    }

    public BidMessage(String userId, int auctionId,  int itemId, double amount, Date created) {
        this.userId = userId;
        this.auctionId = auctionId;
		this.itemId = itemId;
		this.amount = amount;
		this.created = created;
    }

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getAuctionId() {
		return auctionId;
	}

	public void setAuctionId(int auctionId) {
		this.auctionId = auctionId;
	}
	
	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}
	
	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}	

	@Override
	public String toString() {
		return "BID [itemId=" + itemId + ", auctionId=" + auctionId + ", amount=" + amount + ", userId="+ userId + "]";
	}

}