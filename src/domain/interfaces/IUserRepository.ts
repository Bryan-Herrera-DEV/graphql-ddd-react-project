import { User } from "../models/contracts";

export interface IUserRepository {
  findById(id: number | null): Promise<User>;
  findByEmail(email: string): Promise<User>;
  saveUser(user: User): Promise<User>;
}