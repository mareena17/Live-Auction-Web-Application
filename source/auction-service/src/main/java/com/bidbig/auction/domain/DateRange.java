package com.bidbig.auction.domain;

import java.util.Date;
import org.joda.time.DateTime;


public class DateRange {

	private Date startDate;

    private Date endDate;

    private boolean items = false;
    
    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public boolean getItems() {
        return items;
    }

    public void setItmes(boolean items) {
        this.items = items;
    }

}

