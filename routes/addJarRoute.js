const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const db = mongoose.connection;



router.post('/add-jar', async (req, res) => {
    const postData = req.body;
    try {
      const result = await db.collection('jars').insertOne(postData);
      console.log('Inserted data with ID:', result.insertedId);
      res.status(200).json({ message: 'Data received and saved successfully' });
    } catch (err) {
      console.error('Error inserting data into MongoDB:', err);
      res.status(500).json({ message: 'Failed to save data' });
    }
  })

module.exports = router