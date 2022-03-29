import AppError from '../../../shared/errors/AppError';
import Notes from '../infra/typeorm/entities/Notes';
import FakeNotesRepository from '../repositories/fakes/FakeNotesRepository';
import CreateNoteService from './CreateNotesService';
import ListAllNotes from './ListAllNotes';

describe('ListAllNoteService', () => {
  it('should be able to list a note', async () => {
    const fakeNoteRepository = new FakeNotesRepository();
    const createNoteService = new CreateNoteService(fakeNoteRepository);
    const listNoteService = new ListAllNotes(fakeNoteRepository);

    const note = await createNoteService.execute({
      user_id: '1234',
      title: 'test note',
      description: 'test description',
    });

    const noteList: Notes[] = [];

    noteList.push(note);

    const listNotes = await listNoteService.execute({ user_id: '1234' });

    expect(listNotes).toEqual(noteList);
  });

  it('should not be able to list a note with a non existing user', async () => {
    const fakeNoteRepository = new FakeNotesRepository();
    const listNoteService = new ListAllNotes(fakeNoteRepository);
    expect(
      listNoteService.execute({ user_id: undefined })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list a note', async () => {
    const fakeNoteRepository = new FakeNotesRepository();
    const createNoteService = new CreateNoteService(fakeNoteRepository);
    const listNoteService = new ListAllNotes(fakeNoteRepository);

    await createNoteService.execute({
      user_id: '1234',
      title: 'test note',
      description: 'test description',
    });

    expect(
      listNoteService.execute({ user_id: '12345' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
