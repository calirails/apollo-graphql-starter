import { GraphQLModule } from '@graphql-modules/core'
import { UserIdentity } from '../types'
import { AuthModule } from '../auth'
import gql from 'graphql-tag'

export const IdentityModule = new GraphQLModule({
  name: 'identity',
  imports: [ AuthModule ],
  typeDefs: gql`
    type Query {
      "Protected: requires authenticated user but does not mandate a role. Result: returns the current user making the request"
      me: User
    }

    type User {
      id: ID!
      username: String!
    }
  `,
  resolvers: {
    Query: {
      me: (_root: any, _args: any, context: any, _info: any) : UserIdentity[] => context.currentUser
    },
    User: {
      id: (user: any) => user._id,
      username: (user: any) => user.name
    }
  }
})