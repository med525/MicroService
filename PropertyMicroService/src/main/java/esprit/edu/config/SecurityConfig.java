package esprit.edu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/h2/**", "/h2-console/**").permitAll()
                        .requestMatchers("/properties/**").authenticated()
                        .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.disable()) // Disable CSRF for H2 and testing purposes
                .headers(headers -> headers.frameOptions().disable()) // Enable H2 console in browser
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults())); // ✅ Use default JWT parser without custom converter

        return http.build();
    }
}
