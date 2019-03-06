const mongoose = require('mongoose');

// create our db and connect
mongoose.connect('mongodb://localhost/gameplay', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected.');
});

mongoose.connection.on('error', (err) => {
    console.log(err, 'There was a Mongoose error.');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected.');
});