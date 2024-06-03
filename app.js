


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userRoute = require('./routes/userRoute');
const jarRoute = require('./routes/jarsRoute');
const Jar = require('./models/Jar')

const PORT = 8000;
const dbName = 'notify';


const app = express();


app.use(express.json());
app.use(cors())


app.use('/api', userRoute);
app.use('/api', jarRoute );



app.post('/add-jar', async (req, res) => {
    const postData = req.body;

    try {
      const result = await db.collection('jars').insertOne(postData);
      console.log('Inserted data with ID:', result.insertedId);
      res.status(200).json({ message: 'Data received and saved successfully' });
    } catch (err) {
      console.error('Error inserting data into MongoDB:', err);
      res.status(500).json({ message: 'Failed to save data' });
    }
  });

  app.get('/api/jar/:jarId', async (req, res) => {
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
  });


app.post("/api/add-sticker/:jarId", async (req, res) => {
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
});







  

mongoose.connect(`mongodb+srv://root:djNMmKFD2TxNkuoE@cluster0.5qljdac.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Db connected');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Connection error', err);
});


const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

