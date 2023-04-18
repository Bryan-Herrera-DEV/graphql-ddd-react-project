export class User {
  id: number | undefined;
  email: string | undefined;
  password: string | undefined;
  todoLists: ToDoList[] | undefined;
}

export class ToDoList {
  id: number | undefined;
  title: string | undefined;
  user: User | undefined;
  todoItems: ToDoItem[] | undefined;
}

export class ToDoItem {
  id: number | undefined;
  content: string | undefined;
  completed: boolean | undefined;
  todoList: ToDoList | undefined;
}

export interface LoggedUser extends User {
  token: string;
}
