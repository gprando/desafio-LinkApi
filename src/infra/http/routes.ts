import { Router } from 'express';
import BusinessController from './controllers/BusinessController';

const routes = Router();

const businessController = new BusinessController();

routes.get('/', (request, response) => response.json({ ok: true }));
routes.post('/business/integration', businessController.create);
routes.get('/business', businessController.index);

export default routes;
