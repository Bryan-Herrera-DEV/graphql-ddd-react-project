import { ToDoList } from "./../../domain/models/contracts";

export interface IToDoListRepository {
    findById(id: number | null): Promise<ToDoList>;
    findAllByUser(userId: number): Promise<ToDoList[]>;
    save(toDoList: ToDoList): Promise<ToDoList>;
    delete(id: number, userId: number): Promise<boolean>;
}