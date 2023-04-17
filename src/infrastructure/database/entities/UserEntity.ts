import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { ToDoListEntity } from "./ToDoListEntity";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ unique: true })
  email: string | undefined;

  @Column()
  password: string | undefined;

  @OneToMany(() => ToDoListEntity, (todoList) => todoList.user)
  todoLists: ToDoListEntity[] | undefined;
}
