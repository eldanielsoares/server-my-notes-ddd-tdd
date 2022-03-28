import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class HashProvider implements IHashProvider {
  public async hashPassword(password: string): Promise<string> {
    const hashPassword = await hash(password, 8);

    return hashPassword;
  }

  public async comparePassword(
    password: string,
    cryptoPassword: string
  ): Promise<boolean> {
    const matchedPassword = await compare(password, cryptoPassword);

    return matchedPassword;
  }
}

export default HashProvider;
