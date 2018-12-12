package com.bidbig.account.config;

import feign.Logger;
import org.springframework.context.annotation.*;


@Configuration
public class FeignConfiguration {
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.HEADERS;
    }
}