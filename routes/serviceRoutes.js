const express = require("express");
const controller = require("../controllers/serviceController");
const router = express.Router();

router.get("/retrieve-all", controller.getAll);
router.get("/retrieve/:id", controller.getById);
router.post("/add", controller.add);
router.put("/update", controller.update);
router.delete("/remove/:id", controller.remove);
router.get("/health", controller.healthCheck);

module.exports = router;
