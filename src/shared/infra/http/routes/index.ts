import { Router } from 'express';
import notesRouter from '../../../../modules/notes/infra/http/routes/notes.routes';
import sessionRouter from '../../../../modules/users/infra/http/routes/session.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/notes', notesRouter);

export default routes;
