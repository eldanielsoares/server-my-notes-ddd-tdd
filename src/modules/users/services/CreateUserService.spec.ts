import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateuserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const userService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await userService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with same email from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '1234',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
