import express from "express";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import "dotenv/config";

import { typeDefs, resolvers } from "./schema";

import "./db";

const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    session: req.session
  })
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:3000"
  }
});

app.listen(process.env.PORT, () =>
  console.log(
    `Server Running at http://localhost:${process.env.PORT}${
      server.graphqlPath
    }`
  )
);
