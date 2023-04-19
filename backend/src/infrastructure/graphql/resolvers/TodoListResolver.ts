import { Resolver, Mutation, Arg, Query, UseMiddleware } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { ToDoListType } from "../types/ToDoListType";

import { User, ToDoList } from "./../../../domain/models/contracts";
import { ToDoListRepository } from "./../../../infrastructure/database/repositories/ToDoListRepository";
import { isAuthenticated } from "./../middleware/isAuthenticated";

@Resolver(ToDoListType)
export class ToDoListResolver {
  private toDoListRepository: ToDoListRepository;

  constructor() {
    this.toDoListRepository = getCustomRepository(ToDoListRepository);
  }

  @Mutation(() => ToDoListType)
  @UseMiddleware(isAuthenticated)
  async createToDoList(
    @Arg("title") title: string,
    @Arg("userId") userId: number
  ): Promise<unknown> {
    const newToDoList: Omit<ToDoList, "id"> = {
      title,
      user: { id: userId } as User,
      todoItems: [],
    };

    return await this.toDoListRepository.save(newToDoList);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteToDoList(
    @Arg("id") id: number,
    @Arg("userId") userId: number
  ): Promise<boolean> {
    return await this.toDoListRepository.delete(id, userId);
  }

  @Query(() => ToDoListType)
  @UseMiddleware(isAuthenticated)
  async getToDoList(
    @Arg("id") id: number
  ): Promise<unknown> {
    return await this.toDoListRepository.findById(id);
  }
}
