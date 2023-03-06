const request = require("supertest");
const express = require("express");
const mcpRouter = require("../routes/mcpRoute");
const userRouter = require("../routes/usersRoute");
const jwt = require("jsonwebtoken");
const { response } = require("../..");
const { default: mongoose } = require("mongoose");

const app = require("../../app");

const userOne = {
  email: "binguyen@gmail.com",
  password: "12345678",
};

const validWorkers = [
  {
    _id: "637a4d610812d930dfbf8a0e",
    ID: "C6911",
    Name: "Dang Kim Ngan",
    DoB: "1974-02-24",
    Sex: "F",
    Role: "Collector",
    "Phone Number": "'0963963169",
    "Email Address": "BGXGrfHH9z0Sd457@gmail.com",
    isWorking: true,
  },
  {
    _id: "637a4d610812d930dfbf8a10",
    ID: "C0762",
    Name: "Nguyen Minh Vy",
    DoB: "1986-04-10",
    Sex: "F",
    Role: "Collector",
    "Phone Number": "'0967195289",
    "Email Address": "DlV7NqBu1wo548@yahoo.com",
    isWorking: true,
  },
  {
    _id: "637a4d610812d930dfbf8a11",
    ID: "C8513",
    Name: "Do Hung Ngoc",
    DoB: "1981-04-04",
    Sex: "M",
    Role: "Janitor",
    "Phone Number": "'0908229539",
    "Email Address": "Ne0wpnQDeFg11@gmail.com",
    isWorking: true,
  },
  {
    _id: "637a4d610812d930dfbf8a12",
    ID: "C3668",
    Name: "Do Thien My",
    DoB: "1975-01-28",
    Sex: "F",
    Role: "Janitor",
    "Phone Number": "'0915174479",
    "Email Address": "fcLlKhisFt426@gmail.com",
    isWorking: true,
  },
  {
    _id: "637a4d610812d930dfbf8a14",
    ID: "C8401",
    Name: "Nguyen Nam Phi",
    DoB: "1990-07-30",
    Sex: "M",
    Role: "Collector",
    "Phone Number": "'0901781443",
    "Email Address": "Q.tx2BBVxH870@gmail.com",
    isWorking: true,
  },
];

const validMcps = [
  {
    _id: "638ba10499e144a9a75a5c26",
    "Capacity (L)": 27,
    Dist: "Go Vap",
    Lat: {
      $numberDecimal: "10.849378",
    },
    Lng: {
      $numberDecimal: "106.650915",
    },
    MCP_ID: "M5844",
    "Overloaded Time": "0m",
    Status: "OK",
    Number: 1,
    "TotalOverloaded Time": "2hr51m",
    Name: "MCP#1",
  },
  {
    _id: "638ba10499e144a9a75a5c27",
    "Capacity (L)": 38,
    Dist: "5",
    Lat: {
      $numberDecimal: "10.754006",
    },
    Lng: {
      $numberDecimal: "106.656283",
    },
    MCP_ID: "M2909",
    "Overloaded Time": "50m",
    Status: "Overloaded",
    Number: 2,
    "TotalOverloaded Time": "7hr52m",
    Name: "MCP#2",
  },
  {
    _id: "638ba10499e144a9a75a5c28",
    "Capacity (L)": 23,
    Dist: "2",
    Lat: {
      $numberDecimal: "10.788281",
    },
    Lng: {
      $numberDecimal: "106.729608",
    },
    MCP_ID: "M5890",
    "Overloaded Time": "15m",
    Status: "Overloaded",
    Number: 3,
    "TotalOverloaded Time": "16hr15m",
    Name: "MCP#3",
  },
  {
    _id: "638ba10499e144a9a75a5c29",
    "Capacity (L)": 31,
    Dist: "2",
    Lat: {
      $numberDecimal: "10.777762",
    },
    Lng: {
      $numberDecimal: "106.732376",
    },
    MCP_ID: "M1426",
    "Overloaded Time": "8m",
    Status: "Overloaded",
    Number: 4,
    "TotalOverloaded Time": "14hr41m",
    Name: "MCP#4",
  },
  {
    _id: "638ba10499e144a9a75a5c2a",
    "Capacity (L)": 38,
    Dist: "12",
    Lat: {
      $numberDecimal: "10.888877",
    },
    Lng: {
      $numberDecimal: "106.657007",
    },
    MCP_ID: "M0668",
    "Overloaded Time": "6m",
    Status: "Overloaded",
    Number: 5,
    "TotalOverloaded Time": "15hr37m",
    Name: "MCP#5",
  },
];

const validVehicles = [
  {
    _id: "638b723efe3cead171ad4aa8",
    Vehicle_ID: "V1089",
    "License Plate": "79C-04959",
    Brand: "Hino",
    "Capacity (m3)": 11,
    "Fuel Tank": 107,
    "Total Weight": 5244,
  },
  {
    _id: "638b723efe3cead171ad4aa9",
    Vehicle_ID: "V4736",
    "License Plate": "79C-08284",
    Brand: "Hino",
    "Capacity (m3)": 15,
    "Fuel Tank": 126,
    "Total Weight": 5714,
  },
  {
    _id: "638b723efe3cead171ad4aaa",
    Vehicle_ID: "V5773",
    "License Plate": "79C-08487",
    Brand: "Huyndai",
    "Capacity (m3)": 8,
    "Fuel Tank": 112,
    "Total Weight": 5802,
  },
  {
    _id: "638b723efe3cead171ad4aab",
    Vehicle_ID: "V5906",
    "License Plate": "51C-09411",
    Brand: "KamAZ",
    "Capacity (m3)": 14,
    "Fuel Tank": 126,
    "Total Weight": 5339,
  },
  {
    _id: "638b723efe3cead171ad4aac",
    Vehicle_ID: "V7149",
    "License Plate": "79C-08111",
    Brand: "Hino",
    "Capacity (m3)": 7,
    "Fuel Tank": 116,
    "Total Weight": 5411,
  },
];

let accessToken = "";
let refreshToken = "";

beforeAll(async () => {
  const response = await request(app).post("/api/login").send({
    email: userOne.email,
    password: userOne.password,
  });

  // we'll need the token for future requests
  accessToken = response.body.accessToken;
  refreshToken = response.body.refreshToken;
});

afterAll(async () => {
  const response = await request(app)
    .delete("/api/logout")
    .set("Authorization", `Bearer ${refreshToken}`);
});

////                      TEST USERS ROUTES                      ///
describe("Test users route API: ", () => {
  describe("GET /api/workers", () => {
    test("It should return 99 workers information", async () => {
      const response = await request(app)
        .get("/api/workers")
        .set("Authorization", `Bearer ${accessToken}`);
      const workers = response.body;
      expect(response.statusCode).toBe(200);
      expect(workers).toHaveLength(99);
    });
  });

  describe("GET /api/working", () => {
    test("It should return all workers who are working when getting the right token", async () => {
      const response = await request(app)
        .get("/api/working")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.body).toHaveLength(50);
      expect(response.statusCode).toBe(200);
    });

    test("It should return 403 when given wrong token", async () => {
      const response = await request(app)
        .get("/api/working")
        .set("Authorization", `Bearer ${"adfkljadsfl"}`);

      expect(response.statusCode).toBe(403);
    });

    test("It should return 403 when missing token", async () => {
      const response = await request(app)
        .get("/api/working")
        .set("Authorization", `Bearer ${""}`);

      expect(response.statusCode).toBe(403);
    });
  });

  describe("GET /api/users/:id", () => {
    describe("When given valid id with valid token", () => {
      for (let i = 0; i < 5; i++) {
        test(`It should return the correct information for user ${validWorkers[i].ID}`, async () => {
          const response = await request(app)
            .get(`/api/user/${validWorkers[i].ID}`)
            .set("Authorization", `Bearer ${accessToken}`);
          const worker = response.body;
          expect(worker).toEqual(validWorkers[i]);
          expect(response.statusCode).toBe(200);
        });
      }
    });

    test("It should return 403 when missing token", async () => {
      const response = await request(app)
        .get(`/api/user/${"C0762"}`)
        .set("Authorization", `Bearer ${""}`);
      expect(response.statusCode).toBe(403);
    });

    test("It should return 403 when given invalid token", async () => {
      const response = await request(app)
        .get(`/api/user/${"C0762"}`)
        .set("Authorization", `Bearer ${"random-token"}`);
      const mcps = response.body;
      expect(response.statusCode).toBe(403);
    });

    test("It should return nothing when given an invalid ID", async () => {
      const response = await request(app)
        .get(`/api/user/${"random-id"}`)
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({});
    });
  });
});

////                      TEST MCPS ROUTES                      ///
describe("\nTest MCPs route API: ", () => {
  describe("GET /api/mcps", () => {
    test("It should return the information of 24 mcps", async () => {
      const response = await request(app)
        .get("/api/mcps")
        .set("Authorization", `Bearer ${accessToken}`);
      const mcps = response.body;
      expect(response.statusCode).toBe(200);
      expect(mcps).toHaveLength(24);
    });

    test("It should return 403 when missing token", async () => {
      const response = await request(app)
        .get("/api/mcps")
        .set("Authorization", `Bearer ${""}`);
      const mcps = response.body;
      expect(response.statusCode).toBe(403);
    });

    test("It should return 403 when given invalid token", async () => {
      const response = await request(app)
        .get("/api/mcps")
        .set("Authorization", `Bearer ${"random-token"}`);
      const mcps = response.body;
      expect(response.statusCode).toBe(403);
    });
  });

  describe("GET /api/mcps/:id", () => {
    describe("When given valid id with valid token", () => {
      for (let i = 0; i < 5; i++) {
        test(`It should return the correct information for MCP ${validMcps[i].MCP_ID}`, async () => {
          const response = await request(app)
            .get(`/api/mcps/${validMcps[i].MCP_ID}`)
            .set("Authorization", `Bearer ${accessToken}`);
          const mcps = response.body;
          expect(mcps).toEqual(validMcps[i]);
          expect(response.statusCode).toBe(200);
        });
      }
    });

    test("It should return 403 when missing token", async () => {
      const response = await request(app)
        .get(`/api/mcps/${"M5844"}`)
        .set("Authorization", `Bearer ${""}`);
      expect(response.statusCode).toBe(403);
    });

    test("It should return 403 when given invalid token", async () => {
      const response = await request(app)
        .get(`/api/mcps/${"M5844"}`)
        .set("Authorization", `Bearer ${"random-token"}`);
      const mcps = response.body;
      expect(response.statusCode).toBe(403);
    });

    test("It should return nothing when given an invalid ID", async () => {
      const response = await request(app)
        .get(`/api/mcps/${"random-id"}`)
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({});
    });
  });

  describe("GET /api/overloaded-mcps", () => {
    test("It should return the information of 13 overloaded-mcps", async () => {
      const response = await request(app)
        .get("/api/overloaded-mcps")
        .set("Authorization", `Bearer ${accessToken}`);
      const overloadedMcps = response.body;
      expect(response.statusCode).toBe(200);
      expect(overloadedMcps).toHaveLength(13);
    });

    test("It should return 403 when missing token", async () => {
      const response = await request(app)
        .get("/api/overloaded-mcps")
        .set("Authorization", `Bearer ${""}`);
      expect(response.statusCode).toBe(403);
    });

    test("It should return 403 when given invalid token", async () => {
      const response = await request(app)
        .get("/api/overloaded-mcps")
        .set("Authorization", `Bearer ${"random-token"}`);
      const mcps = response.body;
      expect(response.statusCode).toBe(403);
    });
  });
});

////                      TEST VEHICLES ROUTES                      ///
describe("\nTest Vehicles route API: ", () => {
  describe("GET /api/vehicles", () => {
    test("It should return the information of 10 vehicles", async () => {
      const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${accessToken}`);
      const vehicles = response.body;
      expect(response.statusCode).toBe(200);
      expect(vehicles).toHaveLength(10);
    });

    test("It should return 403 when missing token", async () => {
      const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${""}`);
      expect(response.statusCode).toBe(403);
    });

    test("It should return 403 when given invalid token", async () => {
      const response = await request(app)
        .get("/api/vehicles")
        .set("Authorization", `Bearer ${"random-token"}`);
      expect(response.statusCode).toBe(403);
    });
  });

  describe("GET /api/vehicles/:id", () => {
    describe("When given valid id with valid token", () => {
      for (let i = 0; i < 5; i++) {
        test(`It should return the correct information for MCP ${validVehicles[i].Vehicle_ID}`, async () => {
          const response = await request(app)
            .get(`/api/vehicles/${validVehicles[i].Vehicle_ID}`)
            .set("Authorization", `Bearer ${accessToken}`);
          const vehicle = response.body;
          expect(vehicle).toEqual(validVehicles[i]);
          expect(response.statusCode).toBe(200);
        });
      }
    });

    test("It should return 403 when missing token", async () => {
      const response = await request(app)
        .get(`/api/vehicles/${"V1089"}`)
        .set("Authorization", `Bearer ${""}`);
      expect(response.statusCode).toBe(403);
    });

    test("It should return 403 when given invalid token", async () => {
      const response = await request(app)
        .get(`/api/vehicles/${"V1089"}`)
        .set("Authorization", `Bearer ${"random-token"}`);
      expect(response.statusCode).toBe(403);
    });

    test("It should return nothing when given an invalid ID", async () => {
      const response = await request(app)
        .get(`/api/vehicles/${"random-id"}`)
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({});
    });
  });
});
