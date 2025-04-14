package com.example.incident.repositories;

import com.example.incident.entities.Incident;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentRepository extends CrudRepository<Incident, Integer> {
}
