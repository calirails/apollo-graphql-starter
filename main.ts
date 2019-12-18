import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'
import { GraphQLModule } from '@graphql-modules/core'
import { HelloModule } from './domains/hello'
import { IdentityModule } from './domains/identity'
import { PlayerModule } from './domains/player'
import { resolversComposition } from './domains/auth/permissions'


const graphQLApp = new GraphQLModule({
  name: 'graphQLApp',
  imports: [ HelloModule, IdentityModule, PlayerModule ],
  resolversComposition
})

const { schema, context } = graphQLApp

const server = new ApolloServer({
  schema,
  context
})

server.listen().then(({url}: {url: any }) =>
  console.log(`🚀 Apollo GraphQL server running at ${url}}`)
);