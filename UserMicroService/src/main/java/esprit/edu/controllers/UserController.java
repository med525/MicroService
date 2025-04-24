package esprit.edu.controllers;

import esprit.edu.entities.User;
import esprit.edu.services.UserService;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;


@RestController
@RequestMapping("/users")
public class UserController {
    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String realm;


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) throws UnsupportedEncodingException {
        try {
            String username = loginRequest.get("username");
            String password = loginRequest.get("password");

            MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
            form.add("grant_type", "password");
            form.add("client_id", "usermicroservice");
            form.add("client_secret", "dfaW02A3SfmiSxxa3F4SlBx1O9e3MH3T");
            form.add("username", username);
            form.add("password", password);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form, headers);

            RestTemplate restTemplate = new RestTemplate();

            // 🔁 Call Keycloak with try-catch for HTTP errors
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    "http://localhost:9090/realms/maghrebia-realm/protocol/openid-connect/token",
                    request,
                    Map.class
            );

            String accessToken = (String) response.getBody().get("access_token");

            // decode token (optional)
            String[] parts = accessToken.split("\\.");
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            Map<String, Object> payloadMap = new ObjectMapper().readValue(payload, Map.class);

            List<String> roles = (List<String>) ((Map<String, Object>) payloadMap.get("realm_access")).get("roles");

            return ResponseEntity.ok(Map.of(
                    "access_token", accessToken,
                    "roles", roles,
                    "username", username
            ));

        } catch (HttpClientErrorException ex) {
            String raw = ex.getResponseBodyAsString();

            // Fallback if Keycloak returns form-encoded error string
            String errorDescription = "Invalid credentials or account disabled.";
            if (raw != null && raw.contains("error_description")) {
                for (String part : raw.split("&")) {
                    if (part.startsWith("error_description=")) {
                        errorDescription = java.net.URLDecoder.decode(part.split("=")[1], StandardCharsets.UTF_8);
                        break;
                    }
                }
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", errorDescription));



    } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal login error", "details", e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            if (user.getUsername() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
            }

            Keycloak keycloak = KeycloakBuilder.builder()
                    .serverUrl(keycloakServerUrl)
                    .realm("master")
                    .clientId("admin-cli")
                    .username("admin")
                    .password("admin")
                    .build();

            // Set user credentials
            CredentialRepresentation credentials = new CredentialRepresentation();
            credentials.setType(CredentialRepresentation.PASSWORD);
            credentials.setValue(user.getPassword());
            credentials.setTemporary(false);

            // Create user
            UserRepresentation kcUser = new UserRepresentation();
            kcUser.setUsername(user.getUsername());
            kcUser.setEmail(user.getEmail());
            kcUser.setFirstName(user.getFirstName());
            kcUser.setLastName(user.getLastName());
            kcUser.setEnabled(true);
            kcUser.setCredentials(List.of(credentials));

            // Send create request
            Response response = keycloak.realm(realm).users().create(kcUser);
            if (response.getStatus() != 201) {
                return ResponseEntity.status(response.getStatus())
                        .body(Map.of("error", "Keycloak user creation failed", "details", response.getStatusInfo().getReasonPhrase()));
            }

            // Get userId of the created user
            String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

            // Fetch the `user` role from Keycloak
            var userRole = keycloak.realm(realm).roles().get("user").toRepresentation();

            // Assign `user` role to the created user
            keycloak.realm(realm).users().get(userId)
                    .roles().realmLevel()
                    .add(List.of(userRole));

            // Save to your local DB (if needed)
            user.setKeycloakId(userId);
            userService.saveUser(user);

            return ResponseEntity.ok(Map.of("message", "User registered successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Signup failed", "details", e.getMessage()));
        }
    }
    @GetMapping("/keycloak")
    public ResponseEntity<?> getAllKeycloakUsers() {
        try {
            Keycloak keycloak = KeycloakBuilder.builder()
                    .serverUrl(keycloakServerUrl)
                    .realm("master")
                    .clientId("admin-cli")
                    .username("admin")
                    .password("admin")
                    .build();

            List<UserRepresentation> users = keycloak.realm(realm).users().list();

            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch users", "details", e.getMessage()));
        }
    }

    @DeleteMapping("/keycloak/{id}")
    public ResponseEntity<?> deleteKeycloakUser(@PathVariable String id) {
        try {
            Keycloak keycloak = KeycloakBuilder.builder()
                    .serverUrl(keycloakServerUrl)
                    .realm("master")
                    .clientId("admin-cli")
                    .username("admin")
                    .password("admin")
                    .build();

            keycloak.realm(realm).users().get(id).remove();
            return ResponseEntity.ok(Map.of("message", "User deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete user", "details", e.getMessage()));
        }
    }

    @PutMapping("/keycloak/{id}")
    public ResponseEntity<?> updateKeycloakUser(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        try {
            Keycloak keycloak = KeycloakBuilder.builder()
                    .serverUrl(keycloakServerUrl)
                    .realm("master")
                    .clientId("admin-cli")
                    .username("admin")
                    .password("admin")
                    .build();

            var userResource = keycloak.realm(realm).users().get(id);
            UserRepresentation user = userResource.toRepresentation();

            // Update allowed fields
            if (updates.containsKey("email")) user.setEmail((String) updates.get("email"));
            if (updates.containsKey("firstName")) user.setFirstName((String) updates.get("firstName"));
            if (updates.containsKey("lastName")) user.setLastName((String) updates.get("lastName"));
            if (updates.containsKey("enabled")) user.setEnabled((Boolean) updates.get("enabled"));

            userResource.update(user);
            return ResponseEntity.ok(Map.of("message", "User updated"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to update user", "details", e.getMessage()));
        }
    }

}
