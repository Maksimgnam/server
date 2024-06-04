const express = require('express');
const router = express.Router();
const  Jar = require('../models/Jar');



router.delete('/delete-jar/:jarId', async (req, res)=>{
    try {
        const jarId = req.params.jarId;
        const deletedJar = await Jar.deleteOne({_id: jarId});
        
        if (!deletedJar) {
          return res.status(404).json({ error: 'Jar not deleted' });
        }
        res.status(200).json(deletedJar);
      } catch (error) {
        console.error("Error deliting jar:", error);
        res.status(500).json({ error: "Internal server error" });
      }
})

module.exports = router;