/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import Notes from '../infra/typeorm/entities/Notes';
import INotesRepository from '../repositories/INotesRepository';

interface Request {
  title: string;
  description: string;
  user_id: string;
}

@injectable()
class CreateNoteService {
  constructor(
    @inject('NotesRepository')
    private noteRepository: INotesRepository
  ) {}

  public async execute({
    title,
    description,
    user_id,
  }: Request): Promise<Notes> {
    const notes = await this.noteRepository.create({
      title,
      description,
      user_id,
    });

    return notes;
  }
}

export default CreateNoteService;
