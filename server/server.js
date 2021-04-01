const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

require("dotenv").config();

const app = express();

// db connection setup
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("DB connection successful");
  } catch (error) {
    console.log("DB connection failed ", error);
  }
};

// connect to db
db();

// types - query / mutation / subscription
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./schemas"))
);

// resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

// configure graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// applyMiddleware method connects Apollo Server to a specific HTTP framework ex. Express
apolloServer.applyMiddleware({ app });

// express server
const httpServer = http.createServer(app);

app.get("/rest", (req, res) => {
  res.json({
    data: "REST Endpoint",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  console.log(
    `GraphQL server running at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
