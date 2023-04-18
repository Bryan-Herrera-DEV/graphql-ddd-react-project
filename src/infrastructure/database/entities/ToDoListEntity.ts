import { Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
@Entity("todo_lists")
export class ToDoListEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @ManyToOne(() => UserEntity, (user) => user.todoLists)
  user: UserEntity | undefined;
}
