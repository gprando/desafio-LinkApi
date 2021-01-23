import BusinessRepository from '@/infra/typeorm/repositories/BusinessRepository';
import BlingProvider from '@/providers/BlingProvider/implementations/BlingProvider';
import PipedriveProvider from '@/providers/PipedriveProvider/implementations/PipedriveProvider';
import CreateBusinessService from '@/services/CreateBusinessService';
import ListAllBusinessService from '@/services/ListAllBusinessService';
import { Request, Response } from 'express';

class BusinessController {
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
    const pipedriveProvider = new PipedriveProvider(businessRepository);
    const blingProvider = new BlingProvider();

    const createBusiness = new CreateBusinessService(
      businessRepository,
      pipedriveProvider,
      blingProvider,
    );

    const message = await createBusiness.execute();

    return response.json(message);
  }
}

export default BusinessController;
