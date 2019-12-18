// Authentication guard that ensures request is made by signed in user
const isAuthenticated = (next: any) => (root: any, args: any, context: any, info: any) => {
  if (!context.currentUser) {
    throw new Error('[[Authentication Error]] Operation requested requires an authenticated user.')
  }
  
  return next(root, args, context, info)
}

// Authorization guard that ensures that the signed in user has necessary role
const withRole = (role: string) => (next: any) => (root: any, args: any, context: any, info: any) => {
  if (!context.currentUser.roles.some((r: string) => r.trim().toLowerCase()  === role)) {
    throw new Error(`[[Authorization Error]] Operation requested is only permitted by users with a "${role}" role.`)
  }

  return next(root, args, context, info)
}

export {
  isAuthenticated,
  withRole
}