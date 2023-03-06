const express = require("express");
const userController = require("../controllers/userController");
const { auth } = require("../helper/auth");

const router = express.Router();

// get all workers
router.get("/workers", auth, userController.findAllWorkers);

// get all collectors
router.get("/collectors", auth, userController.findAllCollectors);

// get all working workers
router.get("/working", auth, userController.findAllWorking);

// get one user by id
router.get("/user/:id", auth, userController.findUser);

// create 2 BOs
router.post("/create-test-bos", userController.createTest);

// register
router.post("/register", userController.register);

// login
router.post("/login", userController.login);

// logout
router.delete("/logout", userController.logout);

// generate access token
router.post("/generate-access-token", userController.generateAccessToken);

module.exports = router;
