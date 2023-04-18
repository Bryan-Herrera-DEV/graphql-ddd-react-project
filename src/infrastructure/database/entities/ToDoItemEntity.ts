import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { ToDoListEntity } from "./ToDoListEntity";

@Entity("todo_items")
export class ToDoItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  title: string | undefined;

  @Column({ type: "varchar" })
  content: string | undefined;

  @Column({ type: "boolean", default: false })
  completed: boolean | undefined;

  @ManyToOne(() => ToDoListEntity, (todoList) => todoList.todoItems)
  todoList: ToDoListEntity | undefined;
}
