const express = require('express');
const router = express.Router();
const  Jar = require('../models/Jar');

router.get('/jars', async (req, res) => {
    try {
        const users = await Jar.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router