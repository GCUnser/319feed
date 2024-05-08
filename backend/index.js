const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = '319feed';
const client = new MongoClient(url);

app.listen(4000, async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Server is running on http://localhost:4000');
});

const db = client.db(dbName);

app.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await db.collection('quizzes').find({}).toArray();
        res.status(200).json(quizzes);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.get('/quizzes/:id', async (req, res) => {
    try {
        const quiz = await db.collection('quizzes').findOne({ quizId: parseInt(req.params.id) });
        if (quiz) {
            res.status(200).json(quiz);
        } else {
            res.status(404).send('Quiz not found');
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});