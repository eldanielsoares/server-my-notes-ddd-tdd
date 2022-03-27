import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateNoteService from '../../../services/CreateNotesService';
import ListAllNotes from '../../../services/ListAllNotes';

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
}
