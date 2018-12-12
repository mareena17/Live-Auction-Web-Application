package com.bidbig.registry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

import org.springframework.core.io.ClassPathResource;

@SpringBootApplication
@EnableEurekaServer
public class RegistryApplication {

	public static void main(String[] args) {
		System.setProperty("javax.net.ssl.trustStrore", new ClassPathResource("cacerts").getPath());

		SpringApplication.run(RegistryApplication.class, args);
	}
}
