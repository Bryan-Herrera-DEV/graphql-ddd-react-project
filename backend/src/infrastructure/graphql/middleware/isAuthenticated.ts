/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyToken } from "./../../auth/auth";
import { UserRepository } from "./../../../infrastructure/database/repositories/UserRepository";
import { connectionDB } from "./../../../main/config/sqliteConfig";
import { NextFn } from "type-graphql";

export const isAuthenticated = async (
  {
    context,
  }: {
    context: { req: { headers: { authorization: string } } };
  },
  next: NextFn
) => {
    const token = context.req.headers.authorization;
    if (!token) {
        throw new Error("No token provided");
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        throw new Error("Invalid token");
    }
    const userRepository = new UserRepository(connectionDB);
    const user = await userRepository.findById(decoded.id);
    if (!user) {
        throw new Error("User not found");
    }
    return next();
};
