import { Entity, BaseEntity, ManyToOne } from "typeorm";
import { UserEntity } from "./UserEntity";
@Entity("todo_lists")
export class ToDoListEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.todoLists)
  user: UserEntity | undefined;
}
