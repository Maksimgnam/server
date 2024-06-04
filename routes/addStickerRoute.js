const express = require('express');
const router = express.Router();
const  Jar = require('../models/Jar');


router.post('/add-sticker/:jarId',async (req, res) => {
    try {
      const jarId = req.params.jarId;
      const data = req.body;
  
  
      const jar = await Jar.findById(jarId);
      if (!jar) {
        return res.status(404).json({ error: 'Jar not found' });
      }
  
  
      jar.stickers.push(data);
      await jar.save();
  
      res.status(201).json({ message: "Sticker added successfully", id: data._id });
    } catch (error) {
      console.error("Error adding sticker:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })

module.exports = router