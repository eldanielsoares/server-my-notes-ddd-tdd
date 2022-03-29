import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async hashPassword(password: string): Promise<string> {
    return password;
  }

  public async comparePassword(
    password: string,
    cryptoPassword: string
  ): Promise<boolean> {
    return password === cryptoPassword;
  }
}

export default FakeHashProvider;
