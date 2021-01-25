import DailyEarningsRepository from '@/infra/typeorm/repositories/DailyEarningsRepository';
import ListAllDailyEarningsService from '@/services/ListAllDailyEarningsService';
import { Request, Response } from 'express';

class DailyEarningsController {
  async index(request: Request, response: Response): Promise<Response> {
    const dailyEarningsRepository = new DailyEarningsRepository();
    const listAllDailyEarnings = new ListAllDailyEarningsService(
      dailyEarningsRepository,
    );

    const { page, limit } = request.query;

    const result = await listAllDailyEarnings.execute({
      limit: Number(limit) || undefined,
      page: Number(page) || undefined,
    });

    return response.json(result);
  }
}

export default DailyEarningsController;
