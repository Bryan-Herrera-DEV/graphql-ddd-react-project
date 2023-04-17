import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { User, ToDoList } from "./../../../domain/models/contracts";

@EntityRepository(UserEntity)
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  async findById(id: number): Promise<User> {
    const user = await this.findOne({ where: { id } });

    const userResponse: User = {
        id: user?.id,
        email: user?.email,
        password: user?.password,
        todoLists: {} as ToDoList[]
    };

    return userResponse;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } });

    const userResponse: User = {
        id: user?.id,
        email: user?.email,
        password: user?.password,
        todoLists: {} as ToDoList[]
    };

    return userResponse;
  }

  async saveUser(user: User): Promise<User> {
    const userEntity = new UserEntity();
    userEntity.email = user.email;
    userEntity.password = user.password;

    const userSaved = await this.manager.save(userEntity);

    const userResponse: User = {
        id: userSaved.id,
        email: userSaved.email,
        password: userSaved.password,
        todoLists: {} as ToDoList[]
    };

    return userResponse;
  }
}
