import { IPaginatedBusinessDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import IBusinessRepository from '@/repositories/IBusinessRepository';

class ListAllBusinessService {
  private businessRepository: IBusinessRepository;

  constructor(businessRepository: IBusinessRepository) {
    this.businessRepository = businessRepository;
  }

  async execute({
    limit,
    page,
  }: IPaginationDTO): Promise<IPaginatedBusinessDTO> {
    const result = await this.businessRepository.findAllPaginated({
      page,
      limit,
    });

    return result;
  }
}

export default ListAllBusinessService;
