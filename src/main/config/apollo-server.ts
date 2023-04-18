import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import { UserResolver } from "./../../infrastructure/graphql/resolvers/UserResolver";
import { buildSchema } from "type-graphql";

export const setupApolloServer = async (app: Express): Promise<void> => {
  const schema = await buildSchema({
    resolvers: await [UserResolver],
    validate: true,
  });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app });
};
