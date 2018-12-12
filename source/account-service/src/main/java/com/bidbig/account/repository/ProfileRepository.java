package com.bidbig.account.repository;

import com.bidbig.account.domain.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

@Repository
public interface ProfileRepository extends CrudRepository<Profile, String> {


}
