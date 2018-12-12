package com.bidbig.account.service;

import com.bidbig.account.domain.Account;
import com.bidbig.account.domain.Register;

public interface AccountService {

	/**
	 * Finds account by given name
	 *
	 * @param accountName
	 * @return found account
	 */
	Account findByName(String accountName);

	/**
	 * Checks if account with the same name already exists
	 * Invokes Auth Service user creation
	 * Creates new account with default parameters
	 *
	 * @param Register
	 * @return created account
	 */
	Account create(Register register);

	/**
	 * Validates and applies incoming account updates
	 * Invokes Statistics Service update
	 *
	 * @param name
	 * @param update
	 */
	Account saveChanges(String name, Account update);
}
