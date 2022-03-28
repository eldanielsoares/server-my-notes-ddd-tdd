/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import INotesRepository from "../repositories/INotesRepository";

@injectable()
class DeleteNoteService {

  constructor (
    @inject('NotesRepository')
    private notesRepository: INotesRepository
  ){}

  public async execute (id: string): Promise<string>{
    const note = await this.notesRepository.findById(id);

    if(!note){
      throw new AppError('Note not found', 404)
    }

    await this.notesRepository.deleteNote(note);

    return "Note successfully deleted"
  }


}

export default DeleteNoteService;
