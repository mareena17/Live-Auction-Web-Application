package com.bidbig.bidding.domain;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.joda.time.DateTime;
import java.io.Serializable;

@Entity
@Table(name = "bid")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bid implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;

    @Column
    @NotNull
    private String userId;
	
    @Column
    @NotNull	
    private int auctionId;
	
    @Column
    @NotNull
	private int itemId;

    @Column
    @NotNull
	private double amount;

	@Column
	@NotNull
	private String status; 

    @Column
	@NotNull
	@Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime created;

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

	public DateTime getCreated() {
		return created;
	}

	public void setCreated(DateTime created) {
		this.created = created;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
