import AppError from '@/errors/AppError';
import Business from '@/infra/typeorm/schemas/Business';
import IBusinessRepository from '@/repositories/IBusinessRepository';

class ListBusinessByIdService {
  private businessRepository: IBusinessRepository;

  constructor(businessRepository: IBusinessRepository) {
    this.businessRepository = businessRepository;
  }

  async execute(id: string): Promise<Business | undefined> {
    const result = await this.businessRepository.findById(id);

    if (!result) {
      throw new AppError('Not found', 404);
    }

    return result;
  }
}

export default ListBusinessByIdService;
