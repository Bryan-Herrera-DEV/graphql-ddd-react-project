import { UserRepository } from "./../../../infrastructure/database/repositories/UserRepository";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { BcryptProvider } from "./../../../main/provider/HashProvider";
import { User } from "../../../domain/models/contracts";
import { generateToken } from "./../../../infrastructure/auth/auth";
import { UserType } from "../types/UserType";
import { getCustomRepository } from "typeorm";
import Logger from "./../../../main/provider/Logger";
@Resolver(UserType)
export class UserResolver {
  private userRepository: UserRepository;
  private hashProvider: BcryptProvider;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
    this.hashProvider = new BcryptProvider();
  }

  @Mutation(() => String)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<object> {
    await this.userRepository.findByEmail(email).then((user) => {
      if (user.id !== undefined) {
        Logger.error("User already exists.");
        throw new Error("User already exists.");
      }
    });

    const hashedPassword = await this.hashProvider.hash(password);
    const user: Omit<User, "id"> = {
      email,
      password: hashedPassword,
      todoLists: [],
    };

    const nUser = await this.userRepository.saveUser(user);

    return {
      token: generateToken(`${nUser.id}`),
      email: nUser.email,
      id: nUser.id,
    };
  }

  @Query(() => UserType)
  async getUser(@Arg("id") id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}
