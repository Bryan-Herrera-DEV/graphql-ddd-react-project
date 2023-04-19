import { Connection, EntityRepository, Repository } from "typeorm";
import { IToDoItemRepository } from "./../../../domain/interfaces/ITodoItemRepository";
import { ToDoItemEntity } from "./../entities/ToDoItemEntity";
import { ToDoItem } from "./../../../domain/models/contracts";

@EntityRepository(ToDoItemEntity)
export class ToDoItemRepository implements IToDoItemRepository {
  private repository: Repository<ToDoItemEntity>;
  constructor(private connection: Connection) {
    this.repository = this.connection.getRepository(ToDoItemEntity);
  }

  async findById(id: number): Promise<ToDoItem> {
    const toDoItem = await this.repository.findOne({ where: { id } });

    return toDoItem as ToDoItem;
  }

  async findAllByToDoList(
    toDoListId: number,
    isFavorite: boolean | null = null,
    completed: boolean | null = null
  ): Promise<ToDoItem[]> {
    const toDoItems = await this.repository.find({
      where: {
        todoList: { id: toDoListId },
        isFavorite: isFavorite ?? undefined,
        completed: completed ?? undefined,
      },
      order: { createdAt: "DESC" },
    });
    return toDoItems as ToDoItem[];
  }

  async save(toDoItem: Omit<ToDoItem, "id" | "createdAt">): Promise<ToDoItem> {
    return await this.repository.save(toDoItem as ToDoItem);
  }

  async delete(id: number, toDoListId: number): Promise<boolean> {
    const toDoItem = await this.repository.findOne({
      where: { id, todoList: { id: toDoListId } },
    });

    if (!toDoItem) {
      return false;
    }

    await this.repository.delete(id);
    return true;
  }

  async update(
    toDoItem: Omit<ToDoItem, "id" | "createdAt" | "todoList">,
    id: number
  ): Promise<ToDoItem | null> {
    const toDoItemToUpdate = await this.repository.findOne({ where: { id } });

    if (!toDoItemToUpdate) {
      return null;
    }

    toDoItemToUpdate.title = toDoItem.title;
    toDoItemToUpdate.content = toDoItem.content;
    toDoItemToUpdate.completed = toDoItem.completed;
    toDoItemToUpdate.isFavorite = toDoItem.isFavorite;

    return await this.repository.save(toDoItemToUpdate);
  }
}
