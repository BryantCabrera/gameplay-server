import express from 'express';
const session = require('express-session');
import GraphqlServer from './data/schema';
const graphqlHTTP = require('express-graphql');
import cors from 'cors';

const app = express();

require('./db');

/********** MIDDLEWARE **********/
app.use(session({
    secret: "THIS IS A RANDOM STRING SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

app.get('/', (req, res) => {
    res.send('The GamePlay app is working.');
});

//from session tutorial
// app.use('/graphql', graphqlHTTP({
//     schema: GraphqlServer,
//     graphiql: true
// }));

app.use('*', cors({ origin: 'http://localhost:3000'}));

GraphqlServer.applyMiddleware({
    app: app
});

app.listen(4000, () => {
    console.log('The server is running on port 4000.');
    console.log('The graphql server is running on localhost:4000/graphql, check schema file.');
});