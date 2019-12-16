Apollo GraphQL Starter
======================

## Purpose
This is a starter project for building a custom GraphQL based API Gateway with authentication and authorization placeholders you can swap out.

## Implementation
Our GraphQL server is an instance of an Apollo Server setup with Typescript, along with hooks to enable watchers for Typescript auto transpilation of .ts into .js files, as well as tools for code generation of GraphQL TypeDefs within Schema IDL into actual Typescript Types readily used by this server as well as front-end client applications.

##  Starting Apollo GraphQL sever
$ NODE_ENV=<environment> npm run start 
For instance, to run in `development` mode:
$ NODE_ENV=development npm run start // for development
$ npm run start  // or for `production` as the default