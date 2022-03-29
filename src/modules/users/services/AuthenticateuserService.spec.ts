import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeTokenJwtProvider from '../providers/fakes/FakeTokenJwtProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateuserService';
import CreateUserService from './CreateuserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate with email and password', async () => {
    const fakeuserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenJwtProvider = new FakeTokenJwtProvider();

    const createUserService = new CreateUserService(
      fakeuserRepository,
      fakeHashProvider
    );
    const autheticateUserService = new AuthenticateUserService(
      fakeuserRepository,
      fakeHashProvider,
      fakeTokenJwtProvider
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234',
    });

    const response = await autheticateUserService.execute({
      email: 'johndoe@email.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with an non exists email', async () => {
    const fakeuserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenJwtProvider = new FakeTokenJwtProvider();

    const autheticateUserService = new AuthenticateUserService(
      fakeuserRepository,
      fakeHashProvider,
      fakeTokenJwtProvider
    );

    expect(
      autheticateUserService.execute({
        email: 'johndoe@email.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with a wrong password', async () => {
    const fakeuserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenJwtProvider = new FakeTokenJwtProvider();

    const createUserService = new CreateUserService(
      fakeuserRepository,
      fakeHashProvider
    );
    const autheticateUserService = new AuthenticateUserService(
      fakeuserRepository,
      fakeHashProvider,
      fakeTokenJwtProvider
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234',
    });

    expect(
      autheticateUserService.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
