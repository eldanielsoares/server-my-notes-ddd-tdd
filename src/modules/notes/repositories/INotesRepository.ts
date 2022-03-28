/* eslint-disable no-unused-vars */
import ICreateNotes from '../dtos/ICreateNotesDTO';
import Notes from '../infra/typeorm/entities/Notes';

export default interface INotesRepository {
  create(data: ICreateNotes): Promise<Notes>;
  findById(user_id: string): Promise<Notes | undefined>;
  findNotes(user_id: string): Promise<Notes[] | undefined>;
  deleteNote(note: Notes): Promise<void>;
}
