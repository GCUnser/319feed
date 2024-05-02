// Authors: Muralikrishna Patibandla & Gabriel Unser
// Date: April 30th, 2024

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

var fs = require("fs");
var bodyParser = require("body-parser");

// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "319feed";
const client = new MongoClient(url);
const db = client.db(dbName);

const PORT = 4000;
const host = "localhost";
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("App listening at http://%s:%s", host, PORT);
});

app.get("/main", async (req, res) => {
  try {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const result = await db.collection("quizzes").find(query).limit(100).toArray();
    console.log("Success in Reading MongoDB");
    res.status(200).send(result);
  } catch (err) {
    console.error("Error in Reading MongoDB :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});

app.get("/main/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log("Quiz to find :", id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { id: id };

    const results = await db.collection("quizzes").findOne(query);

    if (!results) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).send(results);
    }

    console.log("Results :", results);
  } catch (err) {
    console.error("Error in Reading MongoDB :", err);
    if (!res.headersSent) {
      res.status(500).send({ error: "An error occurred while fetching items." });
    }
  }
});
