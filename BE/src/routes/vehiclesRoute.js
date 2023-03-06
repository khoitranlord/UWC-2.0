const express = require("express");
const mcpController = require("../controllers/vehicleController");
const { auth } = require("../helper/auth");

const router = express.Router();

// get all Vehicles (!!! including BO !!!)
router.get("/vehicles", auth, mcpController.findAllVehicles);


// get one Vehicle by id
router.get("/vehicles/:id", auth, mcpController.findVehicle);

module.exports = router;
