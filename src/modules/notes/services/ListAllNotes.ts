/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { getRepository } from 'typeorm';
import { inject, injectable } from 'tsyringe';
import Notes from '../infra/typeorm/entities/Notes';
import AppError from '../../../shared/errors/AppError';
import INotesRepository from '../repositories/INotesRepository';

interface Request {
  user_id: string;
}

@injectable()
class ListAllNotes {
  constructor(
    @inject('NotesRepository')
    private noteRepository: INotesRepository
  ) {}

  public async execute({ user_id }: Request): Promise<Notes[]> {
    const notes = await this.noteRepository.findById(user_id);

    if (!user_id) {
      throw new AppError('Only authenticated users can get notes', 401);
    }

    if (!notes) {
      throw new AppError('None of notes is found', 404);
    }
    return notes;
  }
}

export default ListAllNotes;