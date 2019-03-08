const mongoose = require('mongoose');

const userGameSchema = new mongoose.Schema({
    title: String,
    author: String,
    wins: Number,
    losses: Number,
    draws: Number
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    img: String,
    games: [userGameSchema]
});

export default mongoose.model('User', userSchema);