import { IPaginatedDailyEarningsDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import IDailyEarningsRepository from '@/repositories/IDailyEarningsRepository';

class ListAllDailyEarningsService {
  private dailyEarningsRepository: IDailyEarningsRepository;

  constructor(dailyEarningsRepository: IDailyEarningsRepository) {
    this.dailyEarningsRepository = dailyEarningsRepository;
  }

  async execute({
    limit,
    page,
  }: IPaginationDTO): Promise<IPaginatedDailyEarningsDTO> {
    const result = await this.dailyEarningsRepository.findAllPaginated({
      page,
      limit,
    });

    return result;
  }
}

export default ListAllDailyEarningsService;
