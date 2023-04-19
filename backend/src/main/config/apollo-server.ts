import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./../../infrastructure/graphql/resolvers/UserResolver";
import { ToDoListResolver } from "./../../infrastructure/graphql/resolvers/TodoListResolver";
import { ToDoItemResolver } from "./../../infrastructure/graphql/resolvers/ToDoItem";

export const setupApolloServer = async (app: Express): Promise<void> => {
  const schema = await buildSchema({
    resolvers: await [UserResolver, ToDoListResolver, ToDoItemResolver],
    validate: true,
  });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app });
};
