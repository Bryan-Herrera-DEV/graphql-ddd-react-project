import { ObjectType, Field, ID } from "type-graphql";
import { ToDoListType } from "./ToDoListType";

@ObjectType()
export class ToDoItemType {
  @Field(() => ID)
  id: number | undefined;

  @Field(() => String)
  title: string | undefined;

  @Field(() => String)
  content: string | undefined;

  @Field(() => Boolean)
  completed: boolean | undefined;

  @Field(() => ToDoListType)
  todoList: ToDoListType | undefined;

  @Field(() => Date)
  createdAt: Date | undefined;

  @Field(() => Boolean)
  isFavorite: boolean | undefined;
}
