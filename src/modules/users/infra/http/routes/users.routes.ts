import { Router } from 'express';
import CreateUserController from '../controllers/CreateUserController';

const createUsersController = new CreateUserController();
const usersRouter = Router();

usersRouter.post('/', createUsersController.create);

export default usersRouter;
