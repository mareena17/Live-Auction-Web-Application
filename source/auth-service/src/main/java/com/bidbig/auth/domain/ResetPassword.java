package com.bidbig.auth.domain;

import javax.validation.constraints.NotNull;

public class ResetPassword {

	@NotNull
	private String token;

	@NotNull
    private String username;
    
    @NotNull
    private String password;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
    }
    
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}    
}
