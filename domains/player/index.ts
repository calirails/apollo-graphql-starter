import { GraphQLModule } from '@graphql-modules/core'
import { PlayerIdentity } from '../types'
import { AuthModule } from '../auth'
import gql from 'graphql-tag'

export const PlayerModule = new GraphQLModule({
  name: 'players',
  imports: [ AuthModule ],
  typeDefs: gql`
    type Mutation {
      "Protected: requires authenticated user with an elible role. Result: creates your starting roster of All-Star Los Angeles basketball players"
      createRoster: [Player]
    }

    type Player {
      id: ID!
      username: String!
      number: Int!
    }

  `,
  resolvers: {
    Mutation: {
      createRoster: (root: any, args: any, context: any) : PlayerIdentity[] => {
        return [
          <PlayerIdentity>{_id: 'lb23', name: 'Lebron James', number: 23},
          <PlayerIdentity>{_id: 'kl02', name: 'Kawhi Leonard', number: 2},
          <PlayerIdentity>{_id: 'kl02', name: 'Kobe Bryant', number: 8},
          <PlayerIdentity>{_id: 'kl02', name: 'Shaquille Oneal', number: 34},
          <PlayerIdentity>{_id: 'kl02', name: 'James Worthy', number: 42},
        ]
      }
    },
    Player: {
      id: (player: any) => player._id,
      username: (player: any) => player.name,
      number: (player: any) => player.number
    }
  }
})