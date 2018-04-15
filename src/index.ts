import app from './App'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { ApolloEngine } from 'apollo-engine'
import * as bodyParser from 'body-parser' 

import { sch } from './graphql/schema'
import { resolverMap } from './graphql/resolvers'

//Puerto donde correra la app
const port = 3000



//Construccion del Schema
let schema = makeExecutableSchema({
  typeDefs: sch, 
  resolvers: resolverMap
});

//Enrutamiento a GraphQL para utilizacion del esquema con graphqlExpress
//graphqlExpress es la funcione que unifica y "enciende" GraphQL en servidores Express
//Las opciones declaradas son:
      //schema: objeto que contiene el schema y resolvers para graphQL
      //context: objeto de contexto para las funciones, en este caso no es necesario y se deja vacio
      //tracing: Permite visualizar informacion extra en los queries
      //cacheControl: Permite utilizacion de cache
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {},
  tracing: true,
  cacheControl: true
}));

//Enrutamiento a GraphiQL para utilizacion de GUI para realizacion de queries
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
})
)

//Declaracion del Engine de Apollo para GraphQL, necesario para implementar cache.
//La api utilizada permite visualizar informacion extra en la GUI de Apollo Engine
const engine = new ApolloEngine({
  apiKey: 'service:Akleiman12-2251:a1DVlA9pySoyjfMVA7fRjg'
});

//Se inicia la aplicacion (a traves del Engine) en local con el puerto indicado
engine.listen({
  port: port,
  expressApp: app,
});
