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

/* app.listen(PORT, () => {
  console.log("App listening at http://%s:%s", host, PORT);
});

app.get("/catalog", async (req, res) => {
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

app.get("/catalog/:id", async (req, res) => {
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

app.post("/catalog", async (req, res) => {
  try {
    await client.connect();

    if (!req.body || Object.keys(req.body).length === 0) {
      const msg = "POST:Bad request: No data provided.";
      console.log(msg);
      return res.status(400).send({ error: msg });
    }

    const itemId = req.body.id;
    query = { id: itemId };
    const quizExists = await db.collection("quizzes").findOne(query);
    if (quizExists) {
      const msg = "POST:Item with this ID already exists";
      console.log(msg);
      return res.status(409).send({ error: msg });
    }

    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const newDocument = {
      id: Number(values[0]),
      title: values[1],
      price: Number(values[2]),
      description: values[3],
      category: values[4],
      image: values[5],
      rating: {
        rate: Number(values[6].rate),
        count: Number(values[6].count),
      },
    };
    console.log(newDocument);

    const results = await db.collection("quizzes").insertOne(newDocument);

    const msg = "POST:Success in Posting";
    console.log(msg);
    return res.status(200).send({ success: msg });
  } catch (err) {
    const msg = "POST: An ERROR occurred in Post" + err;
    console.error(msg);
    res.status(500).send({ error: msg });
  }
});

app.put("/catalog/:id", async (req, res) => {
  const id = Number(req.params.id);

  await client.connect();
  const query = { id: id };
  console.log("Quiz to Update :", id);
  const quizToUpdate = await db.collection("quizzes").findOne(query);
  if (!quizToUpdate) {
    res.status(404).send({ message: "Quiz not found" });
    return;
  }

  const updateData = {
    $set: {
      ...(req.body.title && { title: req.body.title }),
      ...(req.body.price && { price: Number(req.body.price) }),
      ...(req.body.description && { description: req.body.description }),
      ...(req.body.category && { category: req.body.category }),
      ...(req.body.image && { image: req.body.image }),
      ...(req.body.rating && req.body.rating.rate && { "rating.rate": Number(req.body.rating.rate) }),
      ...(req.body.rating && req.body.rating.count && { "rating.count": Number(req.body.rating.count) }),
    },
  };

  const results = await db.collection("quizzes").updateOne(query, updateData);
  if (results.matchedCount === 0) {
    res.status(404).send({ message: "Quiz not found" });
    return;
  }
  const msg = "PUT:Success in updating quiz";
  console.log(msg);
  return res.status(200).json({ success: msg, quiz: quizToUpdate });
});

app.delete("/catalog/:id", async (req, res) => {
  try {
    const itemId = Number(req.params.id);
    await client.connect();
    console.log("Quiz to delete :", itemId);

    const query = { id: itemId };

    const quizToDelete = await db.collection("quizzes").findOne(query);
    if (!quizToDelete) {
      res.status(404).send({ message: "Quiz not found" });
      return;
    }

    const deletionResult = await db.collection("quizzes").deleteOne(query);
    if (deletionResult.deletedCount === 0) {
      throw new Error("Error during deletion");
    }

    const msg = "Success in DELETE quiz";
    console.log(msg);
    return res.status(200).send(quizToDelete);
  } catch (err) {
    const msg = "DELETE: An ERROR occurred in Delete" + err;
    console.error(msg);
    res.status(500).send({ error: msg });
  }
}); */
