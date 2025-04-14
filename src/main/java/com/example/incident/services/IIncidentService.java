package com.example.incident.services;

import com.example.incident.entities.Incident;

import java.util.List;

public interface IIncidentService {
    List<Incident> retrieveAllIncidents();

    Incident addIncident(Incident i);

    Incident updateIncident(Incident i);

    Incident retrieveIncident(Integer id);

    void deleteIncident(Integer id);
}
