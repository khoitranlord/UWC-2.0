const express = require("express");
const mcpController = require("../controllers/mcpController");
const { auth } = require("../helper/auth");

const router = express.Router();

// get all MCPs (!!! including BO !!!)
router.get("/mcps", auth, mcpController.findAllMcps);

// get all overloaded MCPs
router.get("/overloaded-mcps", auth, mcpController.findAllOverloadedMcps);

// get one MCP by id
router.get("/mcps/:id", auth, mcpController.findMcp);

module.exports = router;
