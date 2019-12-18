import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag'
import { createContext } from './context'

// NOTE!: This GraphQLModule, by design, does not expose any operations or types. 
//        It exists as a base module for creating the `currentUser` context so
//        other GraphQLModule instances can import it for authentication/authorization
export const AuthModule = new GraphQLModule({
  name: 'auth',
  context: createContext
})