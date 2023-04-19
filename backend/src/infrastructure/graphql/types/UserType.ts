import { ObjectType, Field, ID } from "type-graphql";
import { ToDoListType } from "./ToDoListType";

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number | undefined;

  @Field(() => String)
  email: string | undefined;

  @Field(() => String)
  password: string | undefined;

  @Field(() => [ToDoListType])
  todoLists: ToDoListType[] | undefined;
}