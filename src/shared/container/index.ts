import { container } from 'tsyringe';
import '../../modules/users/providers';
import NotesRepository from '../../modules/notes/infra/typeorm/repositories/NotesRepository';
import INotesRepository from '../../modules/notes/repositories/INotesRepository';

import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<INotesRepository>(
  'NotesRepository',
  NotesRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
