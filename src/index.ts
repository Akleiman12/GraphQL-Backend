import app from './App'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import * as graphqlHTTP from 'express-graphql'

import { sch } from './graphql/schema'
import { resolverMap } from './graphql/resolvers'

//Puerto donde correra la app
const port = 3000



//Construccion del Schema
let schema = makeExecutableSchema({
  typeDefs: sch, 
  resolvers: resolverMap
});

//Enrutamiento a GraphQL
app.use('/', graphqlHTTP({
  schema: schema,
  //rootValue: root,
  graphiql: true,
}));

//Se inicia la aplicacion en local con el puerto indicado
app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is running on http://localhost:${port}`)
})
