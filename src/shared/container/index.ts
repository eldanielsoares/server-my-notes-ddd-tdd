import { container } from 'tsyringe';
import NotesRepository from '../../modules/notes/infra/typeorm/repositories/NotesRepository';
import INotesRepository from '../../modules/notes/repositories/INotesRepository';
import HashProvider from '../../modules/users/infra/providers/HashProvider';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IHashProvider from '../../modules/users/providers/IHashProvider';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<INotesRepository>(
  'NotesRepository',
  NotesRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
