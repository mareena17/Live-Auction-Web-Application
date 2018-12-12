package com.bidbig.auth.domain;

import javax.validation.constraints.NotNull;

public class ResetRequest {

	@NotNull
	private NotificationType type;

	@NotNull
    private Recipient recipient;
    
    @NotNull
    private String url;

	public NotificationType getType() {
		return type;
	}

	public void setType(NotificationType type) {
		this.type = type;
	}

	public Recipient getRecipient() {
		return recipient;
	}

	public void setRecipient(Recipient recipient) {
		this.recipient = recipient;
    }
    
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}    
}
