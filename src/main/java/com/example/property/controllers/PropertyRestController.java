package com.example.property.controllers;

import com.example.property.entities.Property;
import com.example.property.services.IPropertyService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/property")
@CrossOrigin(origins = "http://localhost:4200")
public class PropertyRestController {
	@Autowired
	IPropertyService propertyService;

	@GetMapping("/retrieve-all")
	public List<Property> getProperties() {
		return propertyService.retrieveAllProperties();
	}

	@GetMapping("/retrieve/{property-id}")
	public Property retrieveProperty(@PathVariable("property-id") Integer propertyId) {
		return propertyService.retrieveProperty(propertyId);
	}

	@PostMapping("/add")
	public Property addProperty(@RequestBody Property p) {
		return propertyService.addProperty(p);
	}

	@DeleteMapping("/remove/{property-id}")
	public void removeProperty(@PathVariable("property-id") Integer propertyId) {
		propertyService.deleteProperty(propertyId);
	}

	@PutMapping("/update")
	public Property updateProperty(@RequestBody Property p) {
		return propertyService.updateProperty(p);
	}

	@PutMapping("/update-location/{id}")
	public ResponseEntity<Property> updateLocation(
			@PathVariable Integer id,
			@RequestParam Double latitude,
			@RequestParam Double longitude) {

		Property property = propertyService.retrieveProperty(id);
		property.setLatitude(latitude);
		property.setLongitude(longitude);
		Property updated = propertyService.updateProperty(property);
		return ResponseEntity.ok(updated);
	}

	@GetMapping("/map-link/{id}")
	public ResponseEntity<String> getMapLink(@PathVariable Integer id) {
		Property property = propertyService.retrieveProperty(id);
		if (property.getLatitude() != null && property.getLongitude() != null) {
			String url = "https://www.google.com/maps?q=" + property.getLatitude() + "," + property.getLongitude();
			return ResponseEntity.ok(url);
		}
		return ResponseEntity.badRequest().body("Location not available");
	}

	@GetMapping("/current-location")
	public ResponseEntity<String> getCurrentLocation() {
		try {
			java.net.URL url = new java.net.URL("http://ip-api.com/json/");
			java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");

			java.io.BufferedReader in = new java.io.BufferedReader(
					new java.io.InputStreamReader(conn.getInputStream()));
			String inputLine;
			StringBuilder content = new StringBuilder();
			while ((inputLine = in.readLine()) != null) {
				content.append(inputLine);
			}
			in.close();

			return ResponseEntity.ok(content.toString());

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Unable to get location: " + e.getMessage());
		}
	}
}

