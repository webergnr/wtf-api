import { Router } from 'express';
// import { authMiddleware } from './middleware/auth';
import { AcronymController } from './controllers/AcronymController';

const routes = Router();

const acronymController = new AcronymController();

routes.post('/acronym', acronymController.create);
routes.get('/acronym', acronymController.search);
routes.get('/acronym/:text', acronymController.find);
routes.get('/random/:count?', acronymController.random);
routes.put('/acronym/:id', acronymController.edit);

export default routes;
