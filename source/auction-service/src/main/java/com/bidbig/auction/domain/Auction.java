package com.bidbig.auction.domain;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.joda.time.DateTime;
import java.io.Serializable;

@Entity
@Table(name = "auction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Auction implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;

    private Long itemId;
    
    @Column
	@NotNull
	@Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime startTime;
	
    @Column
	@NotNull
	@Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime endTime;	

	@Column
	@NotNull
    private Date auctionDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	public DateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(DateTime startTime) {
		this.startTime = startTime;
	}

	public DateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(DateTime endTime) {
		this.endTime = endTime;
	}	

	public Date getAuctionDate() {
		return auctionDate;
	}

	public void setAuctionDate(Date auctionDate) {
		this.auctionDate = auctionDate;
	}
}
