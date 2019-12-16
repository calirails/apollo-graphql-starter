// const cors = require('cors')
import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server'
import { UserIdentity, deriveUserFromToken } from './identity/auth'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String,
    me: User
  }

  type User {
    id: ID!
    username: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello from your Apollo GraphQL Typescript Server!',
    me: (root: any, args: any, context: any) : UserIdentity => {
      const identity = context.userIdentity
      console.log({ identity })
      return context.userIdentity
    }
  },
  User: {
    id: (user: any) => user._id,
    username: (user: any) => user.name
  }
};

const server = new ApolloServer({ 
  typeDefs,
  context: async({req}: {req: any }) => {
    const accessToken = req.headers.authorization
    const userIdentity = await deriveUserFromToken(accessToken)
    console.log({userIdentity})
    return {
      userIdentity
    }
  },
  resolvers
});
// const app = express();
// app.use(cors())
// server.applyMiddleware({ app });

server.listen().then(({url}: {url: any }) =>
  console.log(`🚀 Apollo GraphQL server running at ${url}}`)
);