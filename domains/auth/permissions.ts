import { isAuthenticated, withRole } from './guards'

export const resolversComposition = {
  'Query.me': [isAuthenticated],
  'Mutation.createRoster': [isAuthenticated, withRole('head-coach')],
};