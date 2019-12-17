// const cors = require('cors')
import cors from 'cors'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server'
import { UserIdentity, deriveUserFromToken, isAuthenticated, requringRole } from './identity/auth'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String,
    me: User,
    createRoster: [User]
  }

  type User {
    id: ID!
    username: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    // Public: does not require an authenticated user to query
    hello: () => 'Hello from your Apollo GraphQL Typescript Server!',
    
    // Protected: requires an authenticated user to query
    me: isAuthenticated((_parent: any, _args: any, context: any) : UserIdentity => {
      const identity = context.currentUser
      console.log({ identity })
      return context.currentUser // Note: this exposes the current user as `context.currentUser`
    }),

    // Protected witxh role requirement: requires an authenticated user eligible correct role to query
    createRoster: 
      isAuthenticated(
        requringRole('coach')(
          (root: any, args: any, context: any) : UserIdentity[] => {
              return [
                <UserIdentity>{_id: 'lb23', name: 'Lebron James'},
                <UserIdentity>{_id: 'kl02', name: 'Kawhi Leonard'},
                <UserIdentity>{_id: 'kl02', name: 'Kobe Bryant'},
                <UserIdentity>{_id: 'kl02', name: 'Shaquille Oneal'},
                <UserIdentity>{_id: 'kl02', name: 'James Worthy'},
              ]
          }
        )
      )  
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
      currentUser: Object.freeze(userIdentity)
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