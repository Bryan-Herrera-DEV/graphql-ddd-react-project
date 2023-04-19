import { Resolver, Mutation, Arg, UseMiddleware, Query } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { ToDoItemType } from "../types/ToDoItemType";
import { ToDoItemRepository } from "./../../../infrastructure/database/repositories/ToDoItemRepository";
import { ToDoList } from "./../.././../domain/models/contracts";
import { isAuthenticated } from "./../middleware/isAuthenticated";

@Resolver(ToDoItemType)
export class ToDoItemResolver {
  private ToDoItemRepository: ToDoItemRepository;

  constructor() {
    this.ToDoItemRepository = getCustomRepository(ToDoItemRepository);
  }

  @Mutation(() => ToDoItemType)
  @UseMiddleware(isAuthenticated)
  async createToDoItem(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("todoListId") todoListId: number
  ): Promise<unknown> {
    const newToDoItem = {
      title,
      content,
      todoList: { id: todoListId } as ToDoList,
      completed: false,
      isFavorite: false,
    };

    return await this.ToDoItemRepository.save(newToDoItem);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteToDoItem(
    @Arg("id") id: number,
    @Arg("todoListId") todoListId: number
  ): Promise<boolean> {
    return await this.ToDoItemRepository.delete(id, todoListId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async updateToDoItem(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("completed") completed: boolean,
    @Arg("isFavorite") isFavorite: boolean
  ): Promise<boolean | null> {
    const todoItem = await this.ToDoItemRepository.findById(id);
    if (todoItem.id !== id) {
      return false;
    }

    const nTodoList = {
      title: title ?? todoItem.title,
      content: content ?? todoItem.content,
      completed: completed ?? todoItem.completed,
      isFavorite: isFavorite ?? todoItem.isFavorite,
    };

    const updatedM = this.ToDoItemRepository.update(nTodoList, id);
    if (!updatedM) {
      return false;
    }
    return true;
  }

  @Query(() => ToDoItemType)
  @UseMiddleware(isAuthenticated)
  async getToDoItem(@Arg("id") id: number): Promise<unknown> {
    return await this.ToDoItemRepository.findById(id);
  }

  @Query(() => [ToDoItemType])
  @UseMiddleware(isAuthenticated)
  async getToDoItems(@Arg("todoListId") todoListId: number): Promise<unknown> {
    return await this.ToDoItemRepository.findAllByToDoList(todoListId);
  }

  @Query(() => [ToDoItemType])
  @UseMiddleware(isAuthenticated)
  async getFavoriteToDoItems(
    @Arg("todoListId") todoListId: number
  ): Promise<unknown> {
    return await this.ToDoItemRepository.findAllByToDoList(todoListId, true);
  }

  @Query(() => [ToDoItemType])
  @UseMiddleware(isAuthenticated)
  async getCompletedToDoItems(
    @Arg("todoListId") todoListId: number,
    @Arg("completed") completed: boolean
  ): Promise<unknown> {
    return await this.ToDoItemRepository.findAllByToDoList(
      todoListId,
      null,
      completed
    );
  }
}
