package com.bidbig.account.service;

import com.bidbig.account.client.AuthServiceClient;
import com.bidbig.account.domain.Account;
import com.bidbig.account.domain.Profile;
import com.bidbig.account.domain.Register;
import com.bidbig.account.domain.User;
import com.bidbig.account.repository.AccountRepository;
import com.bidbig.account.repository.ProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class AccountServiceImpl implements AccountService {

	private final Logger log = LoggerFactory.getLogger(getClass());


	@Autowired
	private AuthServiceClient authClient;

	@Autowired
	private AccountRepository repository;

	@Autowired
	private ProfileRepository proRepository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Account findByName(String accountName) {
		Assert.hasLength(accountName);
		System.out.println("--------------------"+ accountName);
		return repository.findByName(accountName);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Account create(Register register) {

		User user = register.getUser();
		Profile profile = register.getProfile();

		Account existing = repository.findByName(user.getUsername());
		if(existing != null) {
			throw new IllegalArgumentException("user already exists: " + user.getUsername());
		}
		// Assert.isNull(existing, "account already exists: " + user.getUsername());

		authClient.createUser(user);

		Account account = new Account();
		account.setName(user.getUsername());
		account.setEmail(user.getEmail());
		account.setLastSeen(new Date());
		profile.setAccount(account);
		account.setProfile(profile);

		repository.save(account);

		log.info("new account has been created: " + account.getName());

		return account;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Account saveChanges(String name, Account update) {

		Account account = repository.findByName(name);
		Assert.notNull(account, "can't find account with name " + name);

		account.setLastSeen(new Date());
		Profile profile = update.getProfile();
		profile.setAccount(account);
		update.setName(name);
		repository.save(update);
		proRepository.save(profile);

		log.debug("account {} changes has been saved", name);
		return update;
	}
}
