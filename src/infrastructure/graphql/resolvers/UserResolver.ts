import { UserRepository } from "./../../../infrastructure/database/repositories/UserRepository";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { BcryptProvider } from "./../../../main/provider/HashProvider";
import { LoggedUser, User } from "../../../domain/models/contracts";
import { generateToken } from "./../../../infrastructure/auth/auth";
import { UserType } from "../types/UserType";
import { getCustomRepository } from "typeorm";
import Logger from "./../../../main/provider/Logger";
import { IJsonResponse } from "./../../../main/provider/IJsonResponse";
import { JsonResponse } from "./../../../main/provider/JsonResponse";
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
  ): Promise<IJsonResponse<Omit<LoggedUser, "password">>> {
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

    const jsonRes: IJsonResponse<Omit<LoggedUser, "password">> =
      new JsonResponse(201, "User created.", {
        token: generateToken(`${nUser.id}`),
        email: nUser.email,
        id: nUser.id,
      } as Omit<LoggedUser, "password">);
    return jsonRes;
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
