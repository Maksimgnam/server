const mongoose = require('mongoose');


const jarSchema = new mongoose.Schema({
    title:String,
    description:String,
    createdDate: String,
    userId: String,
    stickers:[]
    
})

const Jar = mongoose.model('Jar', jarSchema);


module.exports = Jar