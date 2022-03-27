import { getRepository, Repository } from 'typeorm';
import ICreateNotesDTO from '../../../dtos/ICreateNotesDTO';
import INotesRepository from '../../../repositories/INotesRepository';
import Notes from '../entities/Notes';

class NotesRepository implements INotesRepository {
  private ormConfig: Repository<Notes>;

  constructor() {
    this.ormConfig = getRepository(Notes);
  }

  public async findById(user_id: string): Promise<Notes[]> {
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
}

export default NotesRepository;
