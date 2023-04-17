import { User } from "../models/contracts";

export interface IUserRepository {
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<User>;
}