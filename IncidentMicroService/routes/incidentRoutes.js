const express = require("express");
const router = express.Router();
const { reportIncident, listIncidents } = require("../controllers/incidentController");

router.post("/", reportIncident);
router.get("/", listIncidents);

module.exports = router;
