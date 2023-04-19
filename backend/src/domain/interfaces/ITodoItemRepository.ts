import { ToDoItem } from "./../models/contracts";

export interface IToDoItemRepository {
  findById(id: number): Promise<ToDoItem>;
  save(toDoItem: ToDoItem): Promise<ToDoItem>;
  delete(id: number, todoListId: number): Promise<boolean>;
  update(toDoItem: ToDoItem, id: number): Promise<ToDoItem | null>;
}
