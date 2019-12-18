interface UserIdentity {
  _id: string;
  name: string;
  roles: string[];
}

const deriveUserFromToken = async (token: string): Promise<UserIdentity> => {
  // In real world, we would get passed an access or identity `token` argument
  // that we use to check it's validity, and return the user if the token is valid.
  // You can also use external auth libraries, such as jsaccounts / passport, and 
  // trigger it's logic from here.
  
  // To keep boiler-plate simple, decoupled, we pretend and return a fictitious user
  return {
    _id: 'lb23',
    name: 'Lebron James',
    roles: ['player', 'coach']
  }
}

// Authentication wrapper via curried function
const isAuthenticated = (next: any) => (root: any, args: any, context: any, info: any) => {
  if (!context.currentUser) {
    throw new Error('[[Authentication Error]] Operation requested requires an authenticated user.')
  }
  
  return next(root, args, context, info)
}

const requringRole = (role: string) => (next: any) => (root: any, args: any, context: any, info: any) => {
  if (!context.currentUser.roles.some((r: string) => r.trim().toLowerCase()  === role)) {
    throw new Error(`[[Authorization Error]] Operation requested is only permitted by users with a "${role}" role.`)
  }

  return next(root, args, context, info)
}

export {
  UserIdentity,
  deriveUserFromToken,
  isAuthenticated,
  requringRole
}