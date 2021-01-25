import { Router } from 'express';
import BusinessController from './controllers/BusinessController';
import DailyEarningsController from './controllers/DailyEarningsController';
import QueueController from './controllers/QueueController';

const routes = Router();

const businessController = new BusinessController();
const dailyEarningsController = new DailyEarningsController();
const queueController = new QueueController();

routes.post('/business/integration', businessController.create);
routes.post('/queues/integrations/new', queueController.create);
routes.get('/dailys-earnings', dailyEarningsController.index);
routes.get('/business/:id', businessController.show);

export default routes;
