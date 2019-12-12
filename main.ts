// const cors = require('cors')
import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo GraphQL Typescript Server!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors())
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);