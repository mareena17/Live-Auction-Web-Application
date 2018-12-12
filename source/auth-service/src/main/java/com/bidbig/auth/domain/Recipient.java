package com.bidbig.auth.domain;

import org.hibernate.validator.constraints.Email;


import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Entity
@Table(name = "receipient")
public class Recipient implements RecipientInterface{

	@Id
	private String accountName;

	@NotNull
	@Email
	private String email;

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Recipient{" +
				"accountName='" + accountName + '\'' +
				", email='" + email + '\'' +
				'}';
	}
}
