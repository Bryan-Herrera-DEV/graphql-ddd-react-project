import express from "express";
import { setupApolloServer } from "./apollo-server";

const app = express();
setupApolloServer(app);

export default app;
