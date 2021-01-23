import Business from '@/infra/typeorm/entities/Business';
import { ICreateBusinessDTO, IPaginatedBusinessDTO } from '@/dtos';
import { ObjectID } from 'typeorm';
import IPaginationDTO from '@/dtos/IPaginationDTO';

export default interface IBusinessRepository {
  findAll(): Promise<Business[] | undefined>;
  findAllPaginated({
    limit,
    page,
  }: IPaginationDTO): Promise<IPaginatedBusinessDTO>;
  findById(id: ObjectID): Promise<Business | undefined>;
  findByCode(code: number): Promise<Business | undefined>;
  create(data: ICreateBusinessDTO[]): Promise<Business[]>;
}
