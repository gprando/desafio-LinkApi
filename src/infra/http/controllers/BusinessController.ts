import { Request, Response } from 'express';

class BusinessController {
  async index(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }

  async create(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }
}

export default BusinessController;
