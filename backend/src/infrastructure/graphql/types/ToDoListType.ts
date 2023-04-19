import { ObjectType, Field, ID } from "type-graphql";
import { UserType } from "./UserType";
/*
 title: string | undefined;
  content: string | undefined;
  completed: boolean | undefined;
*/
@ObjectType()
export class ToDoListType {
  @Field(() => ID)
  id: number | undefined;

  @Field(() => String)
  title: string | undefined;

  @Field(() => UserType)
  user: UserType | undefined;
}
