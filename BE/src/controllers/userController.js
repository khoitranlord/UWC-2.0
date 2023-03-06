const bcrypt = require("bcrypt");
const dbo = require("../db/config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = dbo.getDb();
let refreshTokens = [];

const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: 60 * 60,
  });
};

exports.findAllWorkers = async (req, res) => {
  const allWorkers = await db.collection("Users").find({}).toArray();
  return res.send(allWorkers);
};

exports.findAllCollectors = async (req, res) => {
  const allCollectors = await db
    .collection("Users")
    .find({ Role: "Collector" })
    .toArray();
  return res.send(allCollectors);
};

exports.findAllJanitors = async (req, res) => {
  const allJanitors = await db
    .collection("Users")
    .find({ Role: "Janitor" })
    .toArray();
  return res.send(allJanitors);
};

exports.findAllWorking = async (req, res) => {
  const allWorking = await db
    .collection("Users")
    .find({ isWorking: true })
    .toArray();
  return res.send(allWorking);
};

exports.findUser = async (req, res) => {
  var user = await db.collection("Users").findOne({ ID: req.params.id });
  if (!user) {
    user = await db.collection("BOs").findOne({ ID: req.params.id });
  }
  return res.send(user);
};

exports.createTest = async (req, res) => {
  const bo1 = {
    ID: "B0001",
    Name: "Nguyen Van Ay",
    DoB: "1978-02-14",
    Sex: "M",
    Role: "BO",
    "Phone Number": "0987145752",
    "Email Address": "aynguyen@gmail.com",
    Password: "123456",
  };
  const bo2 = {
    ID: "B0002",
    Name: "Nguyen Van Bi",
    DoB: "1973-05-25",
    Sex: "F",
    Role: "BO",
    "Phone Number": "0957459226",
    "Email Address": "binguyen@gmail.com",
    Password: "12345678",
  };

  bo1.Password = await bcrypt.hash(bo1.Password, 10);
  bo2.Password = await bcrypt.hash(bo2.Password, 10);

  const check1 = await db.collection("BOs").findOne({ ID: "B0001" });
  const check2 = await db.collection("BOs").findOne({ ID: "B0002" });

  if (check1 || check2) {
    res.status(500).send("BOs already exists.");
    return;
  }

  await db.collection("BOs").insertMany([bo1, bo2]);

  res.send({ bo1, bo2 });
};

exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // should handle in frontend
  if (!email || !password || !confirmPassword) {
    return res
      .status(401)
      .send({ message: "Missing email address or password" });
  }

  if (password !== confirmPassword) {
    return res
      .status(401)
      .send({ message: "The password confirmation does not match" });
  }

  const user = await db.collection("BOs").findOne({ "Email Address": email });

  if (user) {
    return res.status(409).send({ message: "Email address already exists" });
  }

  // generate ID
  const ran = Math.floor(Math.random() * 9000 + 1000);
  const id = `B${ran}`;
  const checkId = await db.collection("BOs").findOne({ ID: id });

  if (checkId) {
    return res.status(500).send({ message: "ID already exists" });
  }

  const newUser = {
    ID: id,
    "Email Address": email,
    Password: await bcrypt.hash(password, 10),
    Role: "BO",
  };

  await db.collection("BOs").insertOne(newUser);

  return res.send({ message: "Successfully register new BO account" });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // should handle in frontend
  if (!email || !password) {
    return res
      .status(401)
      .send({ message: "Missing email address or password" });
  }

  const user = await db.collection("BOs").findOne({ "Email Address": email });
  console.log({ user });
  if (!user) {
    return res.status(404).send({ message: "Email address not found" });
  }

  const isPassValid = await bcrypt.compare(password, user.Password);

  if (!isPassValid) {
    return res
      .status(401)
      .send({ message: "Invalid email address or password" });
  }

  const accessToken = generateToken({ userID: user.ID, Role: "BO" });

  const refreshToken = jwt.sign(
    { userID: user.ID, Role: "BO" },
    process.env.REFRESH_TOKEN_KEY
  );

  refreshTokens.push(refreshToken);
  console.log({ refreshTokens });

  return res.send({ accessToken, refreshToken });
};

exports.logout = async (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.refreshToken
  );
  console.log("refreshTokens array after filtering: ", refreshTokens);

  return res.status(204).send({ message: "Logout successfully" });
};

exports.generateAccessToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).send({ message: "Missing token" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).send({ message: "No permission" });
  }

  let tokenUser;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "No permission" });
    }
    console.log(user);

    tokenUser = user;
  });

  const accessToken = generateToken({ userID: tokenUser.userId, Role: "BO" });
  console.log("new accessToken: ", accessToken);

  return res.send({ accessToken });
};
