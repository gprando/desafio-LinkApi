import AppError from '@/errors/AppError';
import BusinessRepository from '@/infra/typeorm/repositories/BusinessRepository';
import DailyEarningsRepository from '@/infra/typeorm/repositories/DailyEarningsRepository';
import BlingProvider from '@/providers/BlingProvider/implementations/BlingProvider';
import PipedriveProvider from '@/providers/PipedriveProvider/implementations/PipedriveProvider';
import CreateBusinessService from '@/services/CreateBusinessService';
import ListAllBusinessService from '@/services/ListAllBusinessService';
import ListBusinessByIdService from '@/services/ListBusinessByIdService';
import { Request, Response } from 'express';

class BusinessController {
  async show(request: Request, response: Response): Promise<Response> {
    const businessRepository = new BusinessRepository();
    const listAllBusinessService = new ListBusinessByIdService(
      businessRepository,
    );
    const { id } = request.params;

    if (!id) {
      throw new AppError('Id is required', 401);
    }

    const result = await listAllBusinessService.execute(String(id));

    return response.json(result);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const businessRepository = new BusinessRepository();
    const listAllBusinessService = new ListAllBusinessService(
      businessRepository,
    );

    const { page, limit } = request.query;

    const result = await listAllBusinessService.execute({
      limit: Number(limit) || undefined,
      page: Number(page) || undefined,
    });

    return response.json(result);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const businessRepository = new BusinessRepository();
    const dailyEarningsRepository = new DailyEarningsRepository();
    const pipedriveProvider = new PipedriveProvider(businessRepository);
    const blingProvider = new BlingProvider();

    const createBusiness = new CreateBusinessService(
      businessRepository,
      dailyEarningsRepository,
      pipedriveProvider,
      blingProvider,
    );

    const message = await createBusiness.execute();

    return response.json(message);
  }
}

export default BusinessController;
