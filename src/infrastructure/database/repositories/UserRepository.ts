import { Connection, EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { User, ToDoList } from "./../../../domain/models/contracts";

@EntityRepository(UserEntity)
export class UserRepository
  implements IUserRepository
{
  private repository: Repository<UserEntity>;

  constructor(private connection: Connection) {
    this.repository = this.connection.getRepository(UserEntity);
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    const userResponse: User = {
      id: user?.id,
      email: user?.email,
      password: user?.password,
      todoLists: {} as ToDoList[],
    };

    return userResponse;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    const userResponse: User = {
      id: user?.id,
      email: user?.email,
      password: user?.password,
      todoLists: {} as ToDoList[],
    };

    return userResponse;
  }

  async saveUser(user: Omit<User, "id">): Promise<User> {
    const userEntity = new UserEntity();
    userEntity.email = user.email;
    userEntity.password = user.password;

    const userSaved = await this.repository.save(userEntity);

    const userResponse: User = {
      id: userSaved.id,
      email: userSaved.email,
      password: userSaved.password,
      todoLists: {} as ToDoList[],
    };

    return userResponse;
  }
}
