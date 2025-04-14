package com.example.property.services;

import com.example.property.entities.Property;
import com.example.property.repositories.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyServiceImpl implements IPropertyService {

    @Autowired
    PropertyRepository propertyRepository;

    public List<Property> retrieveAllProperties() {
        return (List<Property>) propertyRepository.findAll();
    }

    public Property addProperty(Property p) {
        return propertyRepository.save(p);
    }

    public Property updateProperty(Property p) {
        return propertyRepository.save(p);
    }

    public Property retrieveProperty(Integer id) {
        return propertyRepository.findById(id).orElse(null);
    }

    public void deleteProperty(Integer id) {
        propertyRepository.deleteById(id);
    }
}
