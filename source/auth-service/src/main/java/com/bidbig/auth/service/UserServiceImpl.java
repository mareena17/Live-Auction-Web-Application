package com.bidbig.auth.service;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.UUID;

import com.bidbig.auth.client.NotificationServiceClient;
import com.bidbig.auth.domain.NotificationType;
import com.bidbig.auth.domain.PasswordResetToken;
import com.bidbig.auth.domain.Recipient;
import com.bidbig.auth.domain.ResetPassword;
import com.bidbig.auth.domain.ResetRequest;
import com.bidbig.auth.domain.Role;
import com.bidbig.auth.domain.User;
import com.bidbig.auth.repository.RoleRepository;
import com.bidbig.auth.repository.UserRepository;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final Logger log = LoggerFactory.getLogger(getClass());

	private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	@Autowired
	private UserRepository repository;

	@Autowired
	private RoleRepository roleRepository;	

	@Autowired
	private Environment environment;

	@Autowired
	private NotificationServiceClient notificationClient;

	@Override
	public void create(User user) {

		Optional<User> existing = repository.findById(user.getUsername());

		existing.ifPresent(it-> {throw new IllegalArgumentException("user already exists: " + it.getUsername());});

		String hash = encoder.encode(user.getPassword());		
		user.setPassword(hash);


        Role userRole = roleRepository.findByRole("USER");
        user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));

		repository.save(user);

		log.info("new user has been created: {}", user.getUsername());

	}

	@Override
	public void resetPassword(User user) {

		User userr = repository.findById(user.getUsername()).get();
		System.out.println(userr.getUsername());
		if(userr == null) {
			throw new IllegalArgumentException("user doesn't exists: " + user.getUsername());
		}
		String domain = environment.getProperty("domain");

		String token = UUID.randomUUID().toString();
		String urlString = domain + "uaa/" + "resetted/" + token;

		PasswordResetToken tokenObj = new PasswordResetToken();
		Date dt = new Date();
		DateTime dtOrg = new DateTime(dt);
		DateTime dtPlusOne = dtOrg.plusDays(1);
		tokenObj.setExpiry(dtPlusOne.toDate());
		tokenObj.setToken(token);

		NotificationType notifType = NotificationType.RESET;

		Recipient recepient = new Recipient();

		recepient.setAccountName(userr.getUsername());
		recepient.setEmail(userr.getEmail());

		ResetRequest req = new ResetRequest();

		req.setType(notifType);
		req.setRecipient(recepient);
		req.setUrl(urlString);


		userr.setToken(tokenObj);

		String response = notificationClient.sendPasswordReset(req);

		if(response.equals("Failed")) {
			log.info("reset email failed: {}", user.getUsername());
		}


		repository.save(userr);

		log.info("reset email has been sent: {}", user.getUsername());
	}

	@Override
	public void resettedPassword(ResetPassword resetPassword) {
 
		Optional<User> existing = repository.findById(resetPassword.getUsername());
		User user = existing.orElse(null);
		if(user == null) {
			throw new IllegalArgumentException("user doesn't exists: ");
		}

		if(!user.getToken().getToken().equals(resetPassword.getToken())) {
			throw new IllegalArgumentException("invalid token: " + resetPassword.getToken());
		}

		if(user.getToken().getExpiry().getTime() < System.currentTimeMillis()) {
			throw new IllegalArgumentException("token expired: " + resetPassword.getToken());
		}

		
		String hash = encoder.encode(resetPassword.getPassword());
		user.setPassword(hash);

		repository.save(user);

		log.info("user password has been updated: {}", user.getUsername());
	}		
}
