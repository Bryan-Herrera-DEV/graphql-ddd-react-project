import { Connection, EntityRepository, Repository } from "typeorm";
import { ToDoListEntity } from "./../entities/ToDoListEntity";
import { IToDoListRepository } from "./../../../domain/interfaces/IToDoListRepository";
import { ToDoList } from "./../../../domain/models/contracts";

@EntityRepository(ToDoListEntity)
export class ToDoListRepository implements IToDoListRepository {
  private repository: Repository<ToDoListEntity>;
  constructor(private connection: Connection) {
    this.repository = this.connection.getRepository(ToDoListEntity);
  }
  async findById(id: number): Promise<ToDoList> {
    const toDoList = await this.repository.findOne({ where: { id } });
    return toDoList as ToDoList;
  }

  async findAllByUser(userId: number): Promise<ToDoList[]> {
    const toDoLists = await this.repository.find({
      where: { user: { id: userId } },
    });
    return toDoLists;
  }

  async save(toDoList: Omit<ToDoList, "id">): Promise<ToDoList> {
    return await this.repository.save(toDoList);
  }

  async delete(id: number, userId: number): Promise<boolean> {
    const toDoList = await this.repository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!toDoList) {
      return false;
    }
    await this.repository.delete(id);
    return true;
  }
}
