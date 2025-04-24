const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  propertyId: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Incident", incidentSchema);
