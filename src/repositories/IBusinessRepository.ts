import Business from '@/infra/typeorm/schemas/Business';
import { ICreateBusinessDTO, IPaginatedBusinessDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';

export default interface IBusinessRepository {
  findAll(): Promise<Business[] | undefined>;
  findAllPaginated({
    limit,
    page,
  }: IPaginationDTO): Promise<IPaginatedBusinessDTO>;
  findById(id: string): Promise<Business | undefined>;
  findByCode(code: number): Promise<Business | undefined>;
  create(data: ICreateBusinessDTO[]): Promise<Business[]>;
}
