const dbo = require("../db/config");
const db = dbo.getDb();

exports.findAllCollectorTasks = async (req, res) => {
  const allCTasks = await db.collection("CTasks").find({}).toArray();
  return res.send(allCTasks);
};

exports.findAllJanitorTasks = async (req, res) => {
  const allJTasks = await db.collection("Tasks").find({}).toArray();
  return res.send(allJTasks);
};

exports.findCollectorTask = async (req, res) => {
  const CTasks = await db.collection("CTasks").find({id: req.params.id}).toArray();
  
  if (!CTasks)
    return res.status(404).send("Task not found");
  CTasks[0].listOfMcps = CTasks[0].listOfMcps.split(", ").map(Number)
  let coordinateList =[]
  for (const mcp of CTasks[0].listOfMcps)
  {
    let newCoordinate = await db.collection("MCP").find({Number: mcp}).project({_id: 0,Lat:1, Lng:1}).toArray()
    newCoordinate[0].Lat = parseFloat(newCoordinate[0].Lat.toString())
    newCoordinate[0].Lng = parseFloat(newCoordinate[0].Lng.toString())
    coordinateList.push(newCoordinate);
  }

  CTasks[0]["Coordinate List"] = coordinateList
  return res.send(CTasks);
};

exports.findJanitorTask = async (req, res) => {
  const JTasks = await db.collection("JTasks").find({id: req.params.id}).toArray();
  if (!JTasks)
    return res.status(404).send("Task not found");
  return res.send(JTasks);
};

exports.createCTask = async(req,res) =>{
  const ran = Math.floor(Math.random() * 9000 + 1000);
  const id = `T${ran}`;
  const range = req.body.range;
  const collectorID = req.body.id;
  const collectorName = req.body.name;
  const listOfMcps = req.body.listOfMcps;

  const newTask = {"id": id, "Range": range, "CollectorID": collectorID, "CollectorName":collectorName, "listOfMcps": listOfMcps};
  await db.collection("CTasks").insertOne(newTask);

  res.send("Update Task Successfully!");
};

exports.createJTask = async(req,res) =>{
  const ran = Math.floor(Math.random() * 9000 + 1000);
  const id = `T${ran}`;
  const janitorID = req.body.id;
  const assignedMcp = req.body.assignedMcp;

  const newTask = {"id": id, "JanitorID": janitorID, "assignedMcps": assignedMcps};
  await db.collection("JTasks").insertOne(newTask);

  res.send("Update Task Successfully!");
};
