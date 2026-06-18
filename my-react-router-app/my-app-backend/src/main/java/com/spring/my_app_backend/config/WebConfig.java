package com.spring.my_app_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration //global CORS configuration, replaces the hardcoded @CrossOrigin on the controller
public class WebConfig implements WebMvcConfigurer {

    //comma-separated list of allowed frontend origin PATTERNS.
    //Supports wildcards (e.g. https://interactive-timeline*.vercel.app) so every
    //Vercel deployment URL — production and per-deploy previews — is accepted.
    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
