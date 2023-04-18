import { Resolver, Mutation, Arg } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { ToDoListType } from "../types/ToDoListType";

import { User, ToDoList } from "./../../../domain/models/contracts";
import { ToDoListRepository } from "./../../../infrastructure/database/repositories/ToDoListRepository";

@Resolver(ToDoListType)
export class ToDoListResolver {
    private toDoListRepository: ToDoListRepository;

    constructor() {
        this.toDoListRepository = getCustomRepository(ToDoListRepository);
      }


  @Mutation(() => ToDoListType)
  async createToDoList(
    @Arg("title") title: string,
    @Arg("userId") userId: number
  ): Promise<unknown> {
    const newToDoList: Omit<ToDoList, "id"> = {
        title,
        user: { id: userId } as User,
        todoItems: []
    };

    return await this.toDoListRepository.save(newToDoList);
  }
}
