const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')
const jarRoute = require('./routes/jarsRoute');
const jarIdRoute = require('./routes/jarIdRoute')
const addJarRoute = require('./routes/addJarRoute')
const addStickerRoute = require('./routes/addStickerRoute')
const deleteJarRoute = require('./routes/deleteJarRoute')

const PORT = 8000;
const dbName = 'notify';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())

app.use('/api', jarRoute );
app.use('/api', jarIdRoute)
app.use('/api', addJarRoute)
app.use('/api', addStickerRoute)
app.use('/api', deleteJarRoute)


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

