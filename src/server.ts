import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./infrastructure/graphql/resolvers/UserResolver";
// Using environment variables
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const schema = await buildSchema({
    resolvers: await [UserResolver],
    validate: false,
  });

  const app = Express();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app });


  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000/graphql");
  });
}

main();
