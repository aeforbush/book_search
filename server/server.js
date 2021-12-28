const express = require("express");
// install Apollo server
const { ApolloServer } = require("apollo-server-express");
// import middleware
// const { authMiddleware } = require("./utils/auth");
const path = require("path");

// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");


// to use Playground
// const {
//   ApolloServerPluginLandingPageGraphQLPlayground,
// } = require("apollo-server-core");

// db connection
const db = require("./config/connection");

// const routes = require('./routes');

// express server
const PORT = process.env.PORT || 3001;
const app = express();

// apollo server
// const startApolloServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware,
  });

  // start the apollo server
  // await server.start();

  // integrate our Apollo server with Express app as middleware
  server.applyMiddleware({ app });

  // log where we can go to test out GQL API
  
// };

// initialize the apollo server
// startApolloServer();

// middleware parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.use(routes);

//get all
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
