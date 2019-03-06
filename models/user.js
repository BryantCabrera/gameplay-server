const mongoose = require('mongoose');

const userGameSchema = new mongoose.Schema({
    title: String,
    author: String,
    wins: Number,
    losses: Number
});

const userSchema = new mongoose.Schema({
    firstName: String,
    username: String,
    email: String,
    password: String,
    games: [userGameSchema]
});

export default mongoose.model('User', userSchema);