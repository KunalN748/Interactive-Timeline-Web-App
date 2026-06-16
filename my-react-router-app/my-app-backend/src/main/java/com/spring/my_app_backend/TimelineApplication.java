package com.spring.my_app_backend;

//imports
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication //annotation sets up spring boot application
public class TimelineApplication {

    public static void main(String[] args) {
        SpringApplication.run(TimelineApplication.class, args); //starts spring boot application
    }

    @Bean //annotation for returning a Spring-managed object
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") //api requests from this folder is accessable
                        .allowedOrigins("http://localhost:3000") //only allows the react frontend to make requests
                        .allowedMethods("GET", "POST", "PUT", "DELETE") //what's allowed from HTTP methods
                        .allowedHeaders("*"); //all headers are allowed
            }
        };
    }
}

