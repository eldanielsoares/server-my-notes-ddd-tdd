/* eslint-disable no-unused-vars */
import ITokenJwtDTO from '../dtos/ITokenJwtDTO';

export default interface ITokenJwtProvider {
  sign(data: ITokenJwtDTO): string;
}
