/* eslint-disable no-unused-vars */
export default interface IHashProvider {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, cryptoPassword: string): Promise<boolean>;
}
