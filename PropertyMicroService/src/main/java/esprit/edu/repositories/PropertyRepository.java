package esprit.edu.repositories;

import esprit.edu.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByOwnerId(String ownerId);
}
