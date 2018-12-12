package com.bidbig.auction;


import org.springframework.core.env.Environment;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.beans.factory.annotation.Autowired;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.XmlClientConfigBuilder;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.spring.cache.HazelcastCacheManager;
import org.springframework.cache.CacheManager;


@SpringBootApplication
@EnableDiscoveryClient
@EnableOAuth2Client
@EnableCaching
// @EnableFeignClients
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class AuctionServiceApplication {

	@Autowired
	private Environment env;
	public static void main(String[] args) {
		SpringApplication.run(AuctionServiceApplication.class, args);
	}
	

	@Bean
	HazelcastInstance hazelcastInstance() {

		ClientConfig clientConfig = new XmlClientConfigBuilder().build();
        final HazelcastInstance client = HazelcastClient.newHazelcastClient(clientConfig);

	 return client;
	}
	@Bean
	CacheManager cacheManager() {
	 return new HazelcastCacheManager(hazelcastInstance());
	}

}
