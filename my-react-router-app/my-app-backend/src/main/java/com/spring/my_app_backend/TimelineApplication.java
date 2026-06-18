package com.spring.my_app_backend;

//imports
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //annotation sets up spring boot application
public class TimelineApplication {

    public static void main(String[] args) {
        SpringApplication.run(TimelineApplication.class, args); //starts spring boot application
    }

    // CORS is configured in config/WebConfig.java (driven by the
    // app.cors.allowed-origins property). The previous hardcoded
    // localhost:3000 CORS bean was removed so the deployed frontend works.
}
