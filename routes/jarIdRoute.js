const express = require('express');
const router = express.Router();
const  Jar = require('../models/Jar');

router.get('/jar/:jarId', async (req, res)=>{
    try {
        const jarId = req.params.jarId;
        const jar = await Jar.findById(jarId);
        
        if (!jar) {
          return res.status(404).json({ error: 'Jar not found' });
        }
        res.status(200).json(jar);
      } catch (error) {
        console.error("Error getting jar:", error);
        res.status(500).json({ error: "Internal server error" });
      }
})

module.exports = router