const express = require('express');

// to use Playground
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
// install Apollo server
const { ApolloServer } = require("apollo-server-express");
const path = require('path');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas")

// import middleware
const { authMiddleware } = require("./utils/auth");

// db connection 
const db = require('./config/connection');

const routes = require('./routes');

// express server
const app = express();
const PORT = process.env.PORT || 3001;

// apollo server
const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: authMiddleware,
  });

  // start the apollo server
  await server.start();

  // integrate our Apollo server with Express app as middleware
  server.applyMiddleware({ app });

  // log where we can go to test out GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize the apollo server
startServer();

// middleware parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// //get all
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
