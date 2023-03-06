const express = require("express");
const taskController = require("../controllers/taskController");
const { auth } = require("../helper/auth");

const router = express.Router();

// create tasks for collector
router.post("/create-ctask", auth, taskController.createCTask);

// create tasks for janitor
router.post("/create-jtask", auth, taskController.createJTask);

// get all tasks of collector
router.get("/ctasks", auth, taskController.findAllCollectorTasks);

// get all tasks of janitor
router.get("/jtasks", auth, taskController.findAllJanitorTasks);

// get one task by task id (Collector)
router.get("/ctasks/:id", auth, taskController.findCollectorTask);

// get one task by task id (Janitor)
router.get("/jtasks/:id", auth, taskController.findJanitorTask);

module.exports = router;
