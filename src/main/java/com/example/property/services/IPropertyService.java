package com.example.property.services;

import com.example.property.entities.Property;

import java.util.List;

public interface IPropertyService {
    List<Property> retrieveAllProperties();

    Property addProperty(Property p);

    Property updateProperty(Property p);

    Property retrieveProperty(Integer id);

    void deleteProperty(Integer id);
}