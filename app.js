const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serviceRoutes = require("../service/routes/serviceRoutes");
const registerWithEureka = require("../service/registerWithEureka");

const app = express();
const PORT = 8083;

app.use(cors());
app.use(bodyParser.json());
app.use("/service", serviceRoutes);

app.listen(PORT, () => {
  console.log(`Service is running on port ${PORT}`);
  registerWithEureka("service", PORT);
});
