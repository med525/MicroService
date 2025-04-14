package com.example.incident.services;

import com.example.incident.entities.Incident;
import com.example.incident.repositories.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentServiceImpl implements IIncidentService {

    @Autowired
    IncidentRepository incidentRepository;

    public List<Incident> retrieveAllIncidents() {
        return (List<Incident>) incidentRepository.findAll();
    }

    public Incident addIncident(Incident i) {
        return incidentRepository.save(i);
    }

    public Incident updateIncident(Incident i) {
        return incidentRepository.save(i);
    }

    public Incident retrieveIncident(Integer id) {
        return incidentRepository.findById(id).orElse(null);
    }

    public void deleteIncident(Integer id) {
        incidentRepository.deleteById(id);
    }
}
