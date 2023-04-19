import { UserRepository } from "./../../../infrastructure/database/repositories/UserRepository";
import {
  Resolver,
  Mutation,
  Arg,
  Query,
  UseMiddleware,
} from "type-graphql";
import { BcryptProvider } from "./../../../main/provider/HashProvider";
import { User } from "../../../domain/models/contracts";
import { generateToken } from "./../../../infrastructure/auth/auth";
import { UserType } from "../types/UserType";
import { getCustomRepository } from "typeorm";
import Logger from "./../../../main/provider/Logger";
import { isAuthenticated } from "./../middleware/isAuthenticated";
import { ToDoListRepository } from "./../../../infrastructure/database/repositories/ToDoListRepository";
import { ToDoListType } from "./../types/ToDoListType";
@Resolver(UserType)
export class UserResolver {
  private userRepository: UserRepository;
  private todoListRepository: ToDoListRepository;
  private hashProvider: BcryptProvider;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
    this.todoListRepository = getCustomRepository(ToDoListRepository);
    this.hashProvider = new BcryptProvider();
  }

  @Mutation(() => String)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
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

    return `User ${nUser.email} created.`;
  }

  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("El usuario no existe");
    }

    const valid = await this.hashProvider.compare(password, user.password);
    if (!valid) {
      throw new Error("Contraseña incorrecta");
    }

    const token = generateToken(`${user.id}`);

    return token;
  }

  @Query(() => UserType)
  @UseMiddleware(isAuthenticated)
  async getUser(
    @Arg("id") id: number,
  ): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  @Query(() => [ToDoListType])
  @UseMiddleware(isAuthenticated)
  async getToDoLists(
    @Arg("userId") userId: number,
  ): Promise<ToDoListType[]> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const todoLists = await this.todoListRepository.findAllByUser(userId);

    return todoLists;
  }

}
