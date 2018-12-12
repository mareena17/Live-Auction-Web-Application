package com.bidbig.account.domain;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;

public class Register {


	private User user;

    private Profile profile;
    
    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Profile getProfile() {
        return profile;
    }


}
