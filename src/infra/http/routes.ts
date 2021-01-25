import { Router } from 'express';
import BusinessController from './controllers/BusinessController';
import DailyEarningsController from './controllers/DailyEarningsController';

const routes = Router();

const businessController = new BusinessController();
const dailyEarningsController = new DailyEarningsController();

routes.post('/business/integration', businessController.create);
routes.get('/dailys-earnings', dailyEarningsController.index);
routes.get('/business/:id', businessController.show);

export default routes;
