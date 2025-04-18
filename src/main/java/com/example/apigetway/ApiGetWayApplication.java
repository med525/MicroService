package com.example.apigetway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGetWayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGetWayApplication.class, args);
	}

	@Bean
	public RouteLocator gatewayRoutes (RouteLocatorBuilder builder) {
		return builder.routes()
				.route("property", r -> r.path("/property/**")
						.uri("lb://property"))
				.route("user", r -> r.path("/user/**")
						.uri("lb://user"))
				.route("blog", r -> r.path("/blog/**")
						.uri("lb://blog"))
				.route("service", r -> r.path("/service/**")
						.uri("lb://service"))
				.route("transaction", r -> r.path("/transaction/**")
						.uri("lb://transaction"))
				.route("incident", r -> r.path("/incident/**")
						.uri("lb://incident"))

				.build();
	}
}
