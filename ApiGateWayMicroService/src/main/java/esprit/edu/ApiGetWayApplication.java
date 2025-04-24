package esprit.edu;

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
				.route("blog", r -> r.path("/blog/**")
						.uri("lb://blog"))
				.route("service", r -> r.path("/service/**")
						.uri("lb://service"))
				.route("transaction", r -> r.path("/transaction/**")
						.uri("lb://transaction"))

				.route("incident-service", r -> r.path("/incidents/**")
						.uri("lb://incident-service")) // ✅ must match spring.application.name




				.route("user-service", r -> r.path("/users/**")
						.uri("lb://user-service"))
				.route("property-service", r -> r.path("/properties/**")
						.uri("lb://property-service"))

				.build();
	}
}
