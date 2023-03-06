const dbo = require("../db/config");

const db = dbo.getDb();

exports.findAllVehicles = async (req, res) => {
  const allVehicles = await db.collection("Vehicles").find({}).toArray();
  return res.send(allVehicles);
};

exports.findVehicle = async (req, res) => {
  const vehicle = await db
    .collection("Vehicles")
    .findOne({ Vehicle_ID: req.params.id });
  return res.send(vehicle);
};
