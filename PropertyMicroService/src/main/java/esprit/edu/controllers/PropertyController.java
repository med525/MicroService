package esprit.edu.controllers;

import esprit.edu.entities.Property;
import esprit.edu.services.PropertyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @PostMapping
    public Property create(@RequestBody Property property, Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        property.setOwnerId(jwt.getSubject());
        return propertyService.save(property);
    }

    @GetMapping
    public List<Property> getAll() {
        return propertyService.getAll();
    }

    @GetMapping("/my")
    public List<Property> getMyProperties(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        return propertyService.getByOwnerId(jwt.getSubject());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProperty(
            @PathVariable Long id,
            @RequestBody Property updatedProperty,
            Authentication authentication) {

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userId = jwt.getSubject();

        // ✅ Manually extract admin role
        List<String> roles = jwt.getClaimAsMap("realm_access") != null
                ? (List<String>) ((Map<?, ?>) jwt.getClaimAsMap("realm_access")).get("roles")
                : List.of();

        boolean isAdmin = roles.contains("admin");

        Optional<Property> existingOpt = propertyService.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Property with ID " + id + " not found.");
        }

        Property existingProperty = existingOpt.get();
        boolean isOwner = existingProperty.getOwnerId().equals(userId);

        if (!isOwner && !isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("❌ You are not authorized to update this property.");
        }

        updatedProperty.setId(id);
        updatedProperty.setOwnerId(existingProperty.getOwnerId());
        Property savedProperty = propertyService.save(updatedProperty);

        return ResponseEntity.ok(savedProperty);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(
            @PathVariable Long id,
            Authentication authentication) {

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userId = jwt.getSubject();

        // ✅ Manually extract admin role
        List<String> roles = jwt.getClaimAsMap("realm_access") != null
                ? (List<String>) ((Map<?, ?>) jwt.getClaimAsMap("realm_access")).get("roles")
                : List.of();

        boolean isAdmin = roles.contains("admin");

        Optional<Property> existing = propertyService.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Property with ID " + id + " not found.");
        }

        Property property = existing.get();
        boolean isOwner = property.getOwnerId().equals(userId);

        // Debug logs
        System.out.println("🔐 [DELETE] User ID: " + userId);
        System.out.println("🔐 [DELETE] Roles: " + roles);
        System.out.println("🔐 [DELETE] Owner ID: " + property.getOwnerId());

        if (!isOwner && !isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("❌ Not authorized to delete this property.");
        }

        propertyService.delete(id);
        return ResponseEntity.ok(Map.of("message", "✅ Property deleted successfully."));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Property> property = propertyService.findById(id);
        return property
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Property not found"));
    }



}
