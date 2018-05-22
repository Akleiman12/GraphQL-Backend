import app from './App'
import { makeExecutableSchema } from 'graphql-tools'
import * as graphqlHTTP from 'express-graphql'
import * as bodyParser from 'body-parser'

import { sch } from './graphql/schema'
import { resolverMap } from './graphql/resolvers'
import { DBFiller } from './dbFiller'


import { MongoClient, Db } from 'mongodb';
import { Author, Book, Genre } from './models/library';

//Puerto donde correra la app
const port = 3000

const run = async () =>{

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
            //graphiql: booleano que indica si el servidor utilizara graphiql, lo cual es una herramienta 
            //          para el uso de la API que permite construir queries de forma sencilla, verificando 
            //          que sean correctos y viendo que retornan los mismos
      app.use('/graphql', bodyParser.json(), graphqlHTTP({
        schema,
        context: {},
        graphiql: true
      }));




      //Se inicia la aplicacion (a traves del Engine) en local con el puerto indicado
      app.listen(port)

      console.log("listening on port: "+port)


    //DATABASE FILLER: Descomentar para llenar la Base de Datos con data de prueba
/*    let dbfiller = new DBFiller();
      dbfiller.fill(db); */
}

run();




