const Incident = require("../models/incident");
const { validatePropertyExists } = require("../services/propertyService");
const { publishIncidentMessage } = require('../services/rabbitMQ');

async function reportIncident(req, res) {
    const { propertyId, description } = req.body;
    const authHeader = req.headers.authorization;
  
    if (!propertyId || !description) {
      return res.status(400).json({ error: "propertyId and description are required." });
    }
  
    const exists = await validatePropertyExists(propertyId, authHeader);
    if (!exists) {
      return res.status(404).json({ error: "Property not found." });
    }
  
    try {
      const newIncident = new Incident({ propertyId, description });
      const saved = await newIncident.save();
  
      publishIncidentMessage({
        event: 'incident.reported',
        propertyId: saved.propertyId,
        description: saved.description,
        timestamp: new Date().toISOString()
      });
  
      res.status(201).json({ message: "Incident reported", incident: saved });
    } catch (err) {
      res.status(500).json({ error: "Failed to save incident", details: err.message });
    }
  }
  

async function listIncidents(req, res) {
  const incidents = await Incident.find().sort({ timestamp: -1 });
  res.status(200).json(incidents);
}

module.exports = { reportIncident, listIncidents };
