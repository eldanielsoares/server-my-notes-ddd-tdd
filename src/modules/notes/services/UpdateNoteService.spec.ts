import AppError from '../../../shared/errors/AppError';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import CreateNoteService from './CreateNotesService';
import UpdateNoteService from './UpdateNotesService';

describe('UpdateNoteService', () => {
  it('should be able to update a note', async () => {
    const fakeNoteRepository = new FakeNotesRepository();
    const createNoteService = new CreateNoteService(fakeNoteRepository);
    const updateNoteService = new UpdateNoteService(fakeNoteRepository);

    const note = await createNoteService.execute({
      user_id: '1234',
      title: 'test note',
      description: 'test description',
    });

    const updateNote = await updateNoteService.execute({
      title: 'updated note',
      description: 'this is a note update',
      id: note.id,
    });

    expect(updateNote).toHaveProperty('id');
  });

  it('should not be able to update a note', async () => {
    const fakeNoteRepository = new FakeNotesRepository();
    const updateNoteService = new UpdateNoteService(fakeNoteRepository);

    expect(
      updateNoteService.execute({
        title: 'updated note',
        description: 'this is a note update',
        id: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
