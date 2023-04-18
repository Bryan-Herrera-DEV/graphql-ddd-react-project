import { IUserRepository } from "./../../domain/interfaces/IUserRepository";
import { User } from "../../domain/models/contracts";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async findById(id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.saveUser(user);
  }
}
