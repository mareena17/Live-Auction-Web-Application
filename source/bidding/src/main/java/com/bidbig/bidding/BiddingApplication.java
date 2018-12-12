package com.bidbig.bidding;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.handler.annotation.support.DefaultMessageHandlerMethodFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.beans.factory.annotation.Value;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.XmlClientConfigBuilder;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.spring.cache.HazelcastCacheManager;
import org.springframework.cache.CacheManager;

import java.util.Arrays;

@SpringBootApplication
@EnableDiscoveryClient
@EnableOAuth2Client
@EnableRabbit
@EnableCaching
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class BiddingApplication implements RabbitListenerConfigurer {

	@Value("${exchange.name}")
	private String exchange;

	@Value("${exchange.messageQueue}")
	private String messageQueue;	

	@Value("${exchange.ackQueue}")
	private String ackQueue;

	@Value("${exchange.messageRoutingKey}")
	private String msgRKey;

	@Value("${exchange.ackRoutingKey}")
	private String ackRoutingKey;

	public static void main(String[] args) {
		SpringApplication.run(BiddingApplication.class, args);
	}
	
	/* Creating a bean for the Message queue Exchange */
	@Bean
	public TopicExchange getApp1Exchange() {
		return new TopicExchange(exchange);
	}

	/* Creating a bean for the Message queue */
	@Bean
	public Queue getMsgQueue() {
		return new Queue(messageQueue);
	}
	
	/* Binding between Exchange and Queue using routing key */
	@Bean
	public Binding declareBindingMsg() {
		return BindingBuilder.bind(getMsgQueue()).to(getApp1Exchange()).with(msgRKey);
	}

	/* Creating a bean for the Message queue */
	@Bean
	public Queue getAckQueue() {
		return new Queue(ackQueue);
	}
	
	/* Binding between Exchange and Queue using routing key */
	@Bean
	public Binding declareBindingAck() {
		return BindingBuilder.bind(getAckQueue()).to(getApp1Exchange()).with(ackRoutingKey);
	}

	/* Bean for rabbitTemplate */
	@Bean
	public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
		final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
		rabbitTemplate.setMessageConverter(producerJackson2MessageConverter());
		return rabbitTemplate;
	}

	@Bean
	public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
		return new Jackson2JsonMessageConverter();
	}

	@Bean
	public MappingJackson2MessageConverter consumerJackson2MessageConverter() {
		return new MappingJackson2MessageConverter();
	}
	
	@Bean
	public DefaultMessageHandlerMethodFactory messageHandlerMethodFactory() {
		DefaultMessageHandlerMethodFactory factory = new DefaultMessageHandlerMethodFactory();
		factory.setMessageConverter(consumerJackson2MessageConverter());
		return factory;
	}

	@Override
	public void configureRabbitListeners(final RabbitListenerEndpointRegistrar registrar) {
		registrar.setMessageHandlerMethodFactory(messageHandlerMethodFactory());
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
