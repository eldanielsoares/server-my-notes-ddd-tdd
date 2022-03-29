import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import CreateNoteService from './CreateNotesService';

describe('CreateNoteService', () => {
  it('should be able to create a note', async () => {
    const fakeNoteRepository = new FakeNotesRepository();
    const createNoteService = new CreateNoteService(fakeNoteRepository);

    const note = await createNoteService.execute({
      user_id: '1234',
      title: 'test note',
      description: 'test description',
    });

    expect(note).toHaveProperty('id');
  });
});
