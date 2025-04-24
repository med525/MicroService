package esprit.edu.services;

import esprit.edu.entities.Property;
import esprit.edu.repositories.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public Property save(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAll() {
        return propertyRepository.findAll();
    }

    public List<Property> getByOwnerId(String ownerId) {
        return propertyRepository.findByOwnerId(ownerId);
    }

    public Optional<Property> findById(Long id) {
        return propertyRepository.findById(id);
    }

    public void delete(Long id) {
        propertyRepository.deleteById(id);
    }

}
