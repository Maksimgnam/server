const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    name:String,
    email:String,
    movie_id: Object,
    text:String,
    date:Date
})


const User = mongoose.model('User', userSchema);

module.exports = User