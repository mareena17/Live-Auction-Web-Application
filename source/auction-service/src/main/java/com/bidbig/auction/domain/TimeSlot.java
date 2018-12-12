package com.bidbig.auction.domain;

import java.util.Date;
import org.joda.time.DateTime;


public class TimeSlot {

	private DateTime startTime;

    private DateTime endTime;
    
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
}
