import { resolvers } from './resolvers';
import { ApolloServer } from 'apollo-server-express';

const typeDefs = `
    type User {
        id: ID
        firstName: String
        username: String
        email: String
        password: String
        games: [Game]
    }

    type UserGame {
        id: ID
        title: String
        author: String
        wins: Int
        losses: Int
    }

    type Game {
        id: ID
        title: String
        author: String
        code: String
    }

    type Query {
        getUsers: [User]
    }
`;

const GraphqlServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    setting: {
      'editor.theme': 'light'
    }
  }
});

export default GraphqlServer;