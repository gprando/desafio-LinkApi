import Business from '@/infra/typeorm/entities/Business';
import { ICreateBusinessDTO, IPaginatedBusinessDTO } from '@/dtos';

export default interface IBusinessRepository {
  findAll(): Promise<Business[]>;
  findAllPaginated(): Promise<IPaginatedBusinessDTO>;
  findById(id: number): Promise<Business | null>;
  create(data: ICreateBusinessDTO): Promise<Business>;
}
