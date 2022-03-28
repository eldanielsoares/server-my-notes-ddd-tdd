import { Router } from 'express';
import NotesControllers from '../controllers/NotesController';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/EnsureAuthenticaded';

const notesController = new NotesControllers();
const notesRouter = Router();

notesRouter.use(ensureAuthenticated);

notesRouter.get('/', notesController.show);

notesRouter.post('/', notesController.create);

notesRouter.delete('/delete', notesController.delete);

export default notesRouter;
