/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Notes from '../infra/typeorm/entities/Notes';
import INotesRepository from '../repositories/INotesRepository';

interface Request {
  title: string;
  description: string;
  id: string;
}

@injectable()
class UpdateNoteService {
  constructor(
    @inject('NotesRepository')
    private noteRepository: INotesRepository
  ) {}

  public async execute({ title, description, id }: Request): Promise<Notes> {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new AppError('Note not found', 404);
    }

    note.title = title;
    note.description = description;

    await this.noteRepository.updateNote(note);

    return note;
  }
}

export default UpdateNoteService;
