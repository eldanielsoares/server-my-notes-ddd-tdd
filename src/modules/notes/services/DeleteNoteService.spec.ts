import AppError from '../../../shared/errors/AppError';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import CreateNoteService from './CreateNotesService';
import DeleteNoteService from './DeleteNoteServices';

describe('CreateNoteService', () => {
  it('should be able to delete a note', async () => {
    const fakeNoteRepository = new FakeNotesRepository();
    const createNoteService = new CreateNoteService(fakeNoteRepository);
    const deleteNoteService = new DeleteNoteService(fakeNoteRepository);

    const note = await createNoteService.execute({
      user_id: '1234',
      title: 'test note',
      description: 'test description',
    });

    const deleteNote = await deleteNoteService.execute(note.id);

    expect(deleteNote).toBe('Note successfully deleted');
  });

  it('should be able to delete a note', async () => {
    const fakeNoteRepository = new FakeNotesRepository();
    const deleteNoteService = new DeleteNoteService(fakeNoteRepository);
    expect(deleteNoteService.execute('1234')).rejects.toBeInstanceOf(AppError);
  });
});
