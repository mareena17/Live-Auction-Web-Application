package com.bidbig.account.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "profile")
public class Profile implements Serializable {

	@Id
	@GeneratedValue
	private long id;

	private String name;

    @Valid
    private String address;

    @Valid
    private String city;

    @Valid
    private Integer zip;

    @OneToOne
	@JoinColumn(name = "account", nullable = false)
	@JsonIgnore
	private Account account;
	

	public long getId() {
		return id;
	 }
	 
	 public void setId( long id ) {
		this.id = id;
	 }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Integer getZip() {
		return zip;
	}

	public void setZip(Integer zip) {
		this.zip = zip;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Account getAccount() {
		return account;
	}

}
