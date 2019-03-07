import { resolvers } from './resolvers';
import { ApolloServer } from 'apollo-server-express';

const typeDefs = `
    type User {
        id: ID
        username: String
        email: String
        password: String
        games: [UserGame]
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
        getOneUser(id: ID!): User
        getUsers: [User]
        getOneGame(id: ID!): Game
        getGames: [Game]
    }

    input UserGameInput {
        id: ID
        title: String
        author: String
        wins: Int
        losses: Int
    }

    input UserInput {
        id: ID
        username: String
        email: String
        password: String
        games: [UserGameInput]
    }

    input GameInput {
        id: ID
        title: String
        author: String
        code: String
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(input: UserInput): User
        deleteUser(id: ID!): String
        createGame(input: GameInput): Game
        updateGame(input: GameInput): Game
        deleteGame(id: ID!): String
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