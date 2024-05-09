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
    const userToken = req.query.userToken; 
    try {
        const quiz = await db.collection('quizzes').findOne({ quizId: parseInt(req.params.id) });
        if (!quiz) {
            return res.status(404).send('Quiz not found');
        }

        const userData = await db.collection('userdata').findOne({ userToken, 'data.quizId': parseInt(req.params.id) });
        const hasSubmitted = !!userData; 

        res.status(200).json({ quiz, hasSubmitted, answers: userData ? userData.data.find(d => d.quizId === parseInt(req.params.id)).answers : [] });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.post('/userdata', async (req, res) => {
    try {
        const { userToken, quizId, answers } = req.body;
        const existingEntry = await db.collection('userdata').findOne({ userToken, 'data.quizId': quizId });
        if (existingEntry) {
            res.status(409).send('Duplicate entry: User has already submitted answers for this quiz.');
        } else {
            const result = await db.collection('userdata').updateOne(
                { userToken },
                { $push: { data: { quizId, answers } } },
                { upsert: true }
            );
            res.status(201).json(result);
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.put('/userdata/:userToken', async (req, res) => {
    const { userToken } = req.params;
    const { quizId, answers } = req.body;

    const userData = await db.collection('userdata').findOne({ userToken, 'data.quizId': quizId });
    if (!userData) {
        return res.status(404).send('No existing answers found for this quiz.');
    }

    const result = await db.collection('userdata').updateOne(
        { userToken, 'data.quizId': quizId },
        { $set: { 'data.$.answers': answers } }
    );

    if (result.modifiedCount === 0) {
        return res.status(404).send('Failed to update answers.');
    }
    res.status(200).json(result);
});

app.delete('/userdata/:userToken', async (req, res) => {
    try {
        const userToken = req.params.userToken;
        const result = await db.collection('userdata').deleteOne({ userToken });
        if (result.deletedCount === 0) {
            return res.status(404).send('User answers not found');
        }
        res.status(200).send('User answers deleted');
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});