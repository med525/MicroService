package com.example.incident.controllers;

import com.example.incident.entities.Incident;
import com.example.incident.services.IIncidentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/incident")
@CrossOrigin(origins = "http://localhost:4200")
public class IncidentRestController {
	@Autowired
	IIncidentService incidentService;

	@GetMapping("/retrieve-all")
	public List<Incident> getIncidents() {
		return incidentService.retrieveAllIncidents();
	}

	@GetMapping("/retrieve/{incident-id}")
	public Incident retrieveIncident(@PathVariable("incident-id") Integer incidentId) {
		return incidentService.retrieveIncident(incidentId);
	}

	@PostMapping("/add")
	public Incident addIncident(@RequestBody Incident i) {
		return incidentService.addIncident(i);
	}

	@DeleteMapping("/remove/{incident-id}")
	public void removeIncident(@PathVariable("incident-id") Integer incidentId) {
		incidentService.deleteIncident(incidentId);
	}

	@PutMapping("/update")
	public Incident updateIncident(@RequestBody Incident i) {
		return incidentService.updateIncident(i);
	}

	@PutMapping("/update-severity/{id}")
	public ResponseEntity<Incident> updateSeverity(
			@PathVariable Integer id,
			@RequestParam String severity) {

		Incident incident = incidentService.retrieveIncident(id);
		incident.setSeverity(severity);
		Incident updated = incidentService.updateIncident(incident);
		return ResponseEntity.ok(updated);
	}

	@GetMapping("/health")
	public String healthCheck() {
		return "Incident service is running";
	}
}
