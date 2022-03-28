/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/models/IHashProvider';
import ITokenJwtProvider from '../providers/models/ITokenJwtProvider';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenJwtProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail({
      email,
    });

    if (!user) {
      throw new AppError('email/password incorrect', 400);
    }

    const matchedPassword = await this.hashProvider.comparePassword(
      password,
      user.password
    );

    if (!matchedPassword) {
      throw new AppError('email/password incorrect', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = this.tokenProvider.sign({ secret, id: user.id, expiresIn });

    return { user, token };
  }
}

export default AuthenticateUserService;
