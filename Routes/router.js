const express = require('express');
const mongoose = require('mongoose');
const Data = require('../Models/dbModel');

const router = express.Router();

router.post('/add-user', async (req, res) => {
    const { username, email } = req.body;

    try {
        const newUser = new Data({ name: username, email });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully!', user: newUser });
    } catch (error) {
        console.error('Error while adding user:', error);
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
});


router.get('/user', async (req, res) => {
    try {
        const users = await Data.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const user = await Data.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});


router.get('/', (req, res) => {
    res.send('Welcome to the API! You can access users data at /user');
});

module.exports = router;
