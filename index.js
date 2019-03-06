import express     from 'express';
import GraphqlServer from './data/schema';
import cors from 'cors';

const app = express();

app.get('/', (req, res) => {
    res.send('The GamePlay app is working.');
});

app.use('*', cors({ origin: 'http://localhost:3000'}));

GraphqlServer.applyMiddleware({
    app: app
});

app.listen(4000, () => {
    console.log('The server is running on port 4000.');
    console.log('The graphql server is running on localhost:4000/graphql, check schema file.');
});