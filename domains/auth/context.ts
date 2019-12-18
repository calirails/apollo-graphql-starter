import { UserIdentity } from '../types'

const deriveUserFromToken = async (token: string): Promise<UserIdentity> => {
  // In real world, we would get passed an access or identity `token` argument
  // that we use to check it's validity, and return the user if the token is valid.
  // You can also use external auth libraries, such as jsaccounts / passport, and 
  // trigger it's logic from here.
  
  // To keep boiler-plate simple, decoupled, we pretend and return a fictitious user
  return {
    _id: 'lb23',
    name: 'Lebron James',
    roles: ['player', 'head-coach']
  }
}

export const createContext = async ({req}: {req: any}) => {
  const accessToken = (req && req.headers) ? req.headers.authorization : ''
  const currentUser = await deriveUserFromToken(accessToken)
  console.log({currentUser})

  return {
    currentUser
  }
}
