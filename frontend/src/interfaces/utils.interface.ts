export interface IUser {
  readonly id: number | undefined;
  email: string | undefined;
  password: string | undefined;
  todoLists: IToDoList[] | undefined;
}

export interface IToDoList {
  readonly id: number | undefined;
  title: string | undefined;
  user: IUser | undefined;
  todoItems: IToDoItem[] | undefined;
}

export interface IToDoItem {
  readonly id: number | undefined;
  title: string | undefined;
  content: string | undefined;
  completed: boolean | undefined;
  todoList: IToDoList | undefined;
  createdAt: Date | undefined;
  isFavorite: boolean | undefined;
}
