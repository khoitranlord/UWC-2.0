const dbo = require("../db/config");

const db = dbo.getDb();

exports.findAllMcps = async (req, res) => {
  const allMcps = await db.collection("MCP").find({}).toArray();
  return res.send(allMcps);
};

exports.findAllOverloadedMcps = async (req, res) => {
  const allMCPs = await db.collection("MCP").find({}).toArray();
  const allOverloadedMCPs = allMCPs.filter((mcp) => mcp.Status == "Overloaded");
  return res.send(allOverloadedMCPs);
};

exports.findMcp = async (req, res) => {
  const MCP = await db.collection("MCP").findOne({ MCP_ID: req.params.id });
  return res.send(MCP);
};
