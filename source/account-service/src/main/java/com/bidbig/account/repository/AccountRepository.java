package com.bidbig.account.repository;

import com.bidbig.account.domain.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

@Repository
public interface AccountRepository extends CrudRepository<Account, String> {

	@Cacheable("findAccountByName")
	Account findByName(String name);

	@CacheEvict(value = "findAccountByName", allEntries = true)
    public Account save(Account account);

}
