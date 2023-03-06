const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./src/routes/usersRoute");
const mcpsRouter = require("./src/routes/mcpRoute");
const vehiclesRouter = require("./src/routes/vehiclesRoute");
const tasksRouter = require("./src/routes/taskRoute");

app.use(express.json());
app.use(cors());
app.use("/api", usersRouter);
app.use("/api", mcpsRouter);
app.use("/api", vehiclesRouter);
app.use("/api", tasksRouter);

module.exports = app;
