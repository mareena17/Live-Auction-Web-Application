package com.bidbig.account.domain;

import java.util.Date;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Account implements Serializable{

    @Id
	private String name;

	private Date lastSeen;

	@OneToOne(mappedBy = "account", cascade = CascadeType.ALL, optional = false)
	private Profile profile;

	@Email
	private String email;


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getLastSeen() {
		return lastSeen;
	}

	public void setLastSeen(Date lastSeen) {
		this.lastSeen = lastSeen;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
