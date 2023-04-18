import { ObjectType, Field, ID } from "type-graphql";
import { UserType } from "./UserType";

@ObjectType()
export class ToDoListType {
  @Field(() => ID)
  id: number | undefined;

  @Field(() => String)
  title: string | undefined;

  @Field(() => UserType)
  user: UserType | undefined;
}
