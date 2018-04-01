let { makeExecutableSchema, addMockFunctionsToSchema, mergeSchemas } = require('graphql-tools');


let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');


// Construct a schema, using GraphQL schema language
var schema = makeExecutableSchema({
    typeDefs: `
        type Query {
            userbyID(id: String): User
            users: [User]
        }

        type User {
            name: String,
            id: Int
        }
    `
});

addMockFunctionsToSchema({schema: schema})



// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hae world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
/*  rootValue: root,*/
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');