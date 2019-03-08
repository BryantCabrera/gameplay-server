const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    code: String
});

export default mongoose.model('Game', gameSchema);