
const express = require('express');
const router = express.Router();
const Jar = require('../models/Jar');
const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuid()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

const fs = require('fs');
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir);
}

router.post('/add-sticker/:jarId', upload.array('photos', 10), async (req, res) => { 
  try {
    const jarId = req.params.jarId;
    const { title, createdDate } = req.body;
    const photos = req.files ? req.files.map(file => file.filename) : [];

    const jar = await Jar.findById(jarId);
    if (!jar) {
      return res.status(404).json({ error: 'Jar not found' });
    }

    const newSticker = { title, createdDate, photos };

    jar.stickers.push(newSticker);
    await jar.save();

    res.status(201).json({ message: "Sticker added successfully", sticker: newSticker });
  } catch (error) {
    console.error("Error adding sticker:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
