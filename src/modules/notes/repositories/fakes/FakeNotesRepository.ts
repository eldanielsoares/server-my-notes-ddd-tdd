import { v4 } from 'uuid';
import ICreateNotesDTO from '../../dtos/ICreateNotesDTO';
import Notes from '../../infra/typeorm/entities/Notes';
import INotesRepository from '../INotesRepository';

class FakeNotesRepository implements INotesRepository {
  private notes: Notes[] = [];

  public async findById(id: string): Promise<Notes> {
    const notes = this.notes.find((findNotes) => findNotes.id === id);
    return notes;
  }

  public async findNotes(user_id: string): Promise<Notes[]> {
    const notes = this.notes.filter(
      (findNotes) => findNotes.user_id === user_id
    );
    return notes;
  }

  public async create(data: ICreateNotesDTO): Promise<Notes> {
    const note = new Notes();
    Object.assign(note, { id: v4() }, data);
    this.notes.push(note);
    return note;
  }

  public async deleteNote(note: Notes): Promise<void> {
    const noteIndex = this.notes.findIndex(
      (findNote) => findNote.id === note.id
    );
    this.notes.splice(noteIndex, 1);
  }

  public async updateNote(note: Notes): Promise<Notes> {
    const noteIndex = this.notes.findIndex(
      (findNote) => findNote.id === note.id
    );

    this.notes[noteIndex] = note;
    return this.notes[noteIndex];
  }
}

export default FakeNotesRepository;
