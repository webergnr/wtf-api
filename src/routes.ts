import { Router } from 'express';
import { authMiddleware } from './middleware/auth';
import { AcronymController } from './controllers/AcronymController';

const routes = Router();

const acronymController = new AcronymController();

routes.post('/acronym', acronymController.create);

export default routes;
