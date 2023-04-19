import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { UserEntity } from "./UserEntity";
import { ToDoItemEntity } from "./ToDoItemEntity";
@Entity("todo_lists")
export class ToDoListEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: "varchar" })
  title: string | undefined;

  @ManyToOne(() => UserEntity, (user) => user.todoLists)
  user: UserEntity | undefined;

  @OneToMany(() => ToDoItemEntity, (todoItem) => todoItem.todoList)
  todoItems: ToDoItemEntity[] | undefined;
}
