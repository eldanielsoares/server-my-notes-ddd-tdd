import { getRepository, Repository } from 'typeorm';
import ICreateNotesDTO from '../../../dtos/ICreateNotesDTO';
import INotesRepository from '../../../repositories/INotesRepository';
import Notes from '../entities/Notes';

class NotesRepository implements INotesRepository {
  private ormConfig: Repository<Notes>;

  constructor() {
    this.ormConfig = getRepository(Notes);
  }

  public async findById(id: string): Promise<Notes> {
    const notes = this.ormConfig.findOne({
      where: { id },
    });

    return notes;
  }

  public async findNotes(user_id: string): Promise<Notes[]> {
    const notes = this.ormConfig.find({
      where: { user_id },
    });

    return notes;
  }

  public async create(data: ICreateNotesDTO): Promise<Notes> {
    const note = this.ormConfig.create(data);

    await this.ormConfig.save(note);

    return note;
  }

  public async deleteNote(note: Notes): Promise<void> {
    await this.ormConfig.remove(note);
  }

  public async updateNote(note: Notes): Promise<Notes> {
    const updatedNote = await this.ormConfig.save(note);
    return updatedNote;
  }
}

export default NotesRepository;
