import app from './App'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import * as graphqlHTTP from 'express-graphql'

import { sch } from './schema'

const port = 3000

//Construccion del Schema
let schema = makeExecutableSchema({
  typeDefs: sch
});

//Añadido de Mock Resolvers
addMockFunctionsToSchema({schema: schema});

//Enrutamiento a GraphQL
app.use('/', graphqlHTTP({
  schema: schema,
  //rootValue: root,
  graphiql: true,
}));


app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
