import { sign } from 'jsonwebtoken';
import ITokenJwtDTO from '../../dtos/ITokenJwtDTO';
import ITokenJwtProvider from '../../providers/ITokenJwtProvider';

class TokenJwtProvider implements ITokenJwtProvider {
  sign({ secret, id, expiresIn }: ITokenJwtDTO): string {
    const token = sign({}, secret, {
      subject: id,
      expiresIn,
    });

    return token;
  }
}

export default TokenJwtProvider;
