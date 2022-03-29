import { v4 } from 'uuid';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import ISessionsDTO from '../../dtos/ISessionsDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private user: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const createUser = new User();

    Object.assign(createUser, { id: v4() }, data);

    this.user.push(createUser);

    return createUser;
  }

  public async findByEmail({ email }: ISessionsDTO): Promise<User | undefined> {
    const findUser = this.user.find(
      (findByEmail) => findByEmail.email === email
    );

    return findUser;
  }
}

export default FakeUsersRepository;
