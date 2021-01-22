import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => response.json({ ok: true }));
routes.get('/business/integration', (request, response) =>
  response.json({ ok: true }),
);

export default routes;
