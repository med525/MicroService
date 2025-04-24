package esprit.edu.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;           // 🆕 Title of the property
    private String type;            // e.g., car, house, travel
    private String description;
    private Double estimatedValue;

    private String location;
    private String ownerId;         // fetched from Keycloak token

    private Double latitude;        // 🆕 Coordinates
    private Double longitude;
}
