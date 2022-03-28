/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail({ email });

    if (checkUserExists) {
      throw new AppError('E-mail already in use');
    }

    const hashedPassowrd = await this.hashProvider.hashPassword(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassowrd,
    });

    return user;
  }
}

export default CreateUserService;
