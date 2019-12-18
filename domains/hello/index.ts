import gql from 'graphql-tag'
import { GraphQLModule } from '@graphql-modules/core';

export const HelloModule = new GraphQLModule({
  name: 'hello',
  typeDefs: gql`
    type Query {
      "Public: anyone can invoke without authentication or authorization based on an assigned role. Result: returns a greeting."
      hello: String
    }
  `,
  resolvers: {
    Query: {
      // Public: anyone can invoke without authentication or authorization based on an assigned role"
      hello: () => 'Hello from your Apollo GraphQL Typescript Server!'
    },
  }
})