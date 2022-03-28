import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateNoteService from '../../../services/CreateNotesService';
import DeleteNoteService from '../../../services/DeleteNoteServices';
import ListAllNotes from '../../../services/ListAllNotes';
import UpdateNoteService from '../../../services/UpdateNotesService';

export default class NotesControllers {
  public async show(request: Request, response: Response): Promise<Response> {
    const listNotesService = container.resolve(ListAllNotes);

    const notes = await listNotesService.execute({ user_id: request.user.id });
    return response.json(notes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const createNotes = container.resolve(CreateNoteService);

    const notes = await createNotes.execute({
      title,
      description,
      user_id: request.user.id,
    });

    return response.json(notes);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;
    const deleteNotes = container.resolve(DeleteNoteService);

    await deleteNotes.execute(String(id));

    return response.json({ message: 'Note successfully deleted' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const { id } = request.query;
    const updateNotes = container.resolve(UpdateNoteService);

    const notes = await updateNotes.execute({
      title,
      description,
      id: String(id),
    });

    return response.json(notes);
  }
}
