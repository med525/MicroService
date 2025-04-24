const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const incidentRoutes = require("./routes/incidentRoutes");
const { registerWithEureka } = require("./services/eurekaClient");
const { connectRabbitMQ } = require('./services/rabbitMQ');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/incidentdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
  connectRabbitMQ();

const app = express();
app.use(express.json());

app.use("/incidents", incidentRoutes);

registerWithEureka();

app.listen(3004, () => {
  console.log("🚀 IncidentMicroService running at http://localhost:3004");
});
