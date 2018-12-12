package com.bidbig.auth.service;

import com.bidbig.auth.domain.ResetPassword;
import com.bidbig.auth.domain.User;

public interface UserService {

	void create(User user);

	void resetPassword(User user);

	void resettedPassword(ResetPassword resetPassword);
}
