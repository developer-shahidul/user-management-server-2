require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.39yqdr4.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();
  const db = client.db("User-P");
  const users = db.collection("items");

  app.get("/users", async (req, res) => {
    const result = await users.find().toArray();
    res.send(result);
  });

  app.post("/users", async (req, res) => {
    const result = await users.insertOne(req.body);
    res.send(result);
  });

  app.delete("/users/:id", async (req, res) => {
    const result = await users.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
  });
}

run().catch(console.error);

module.exports = app; //  ⭐ VERY IMPORTANT
