import DailyEarnings from '@/infra/typeorm/schemas/DailyEarnings';
import {
  IPaginatedDailyEarningsDTO,
  ICreateDailyEarningDTO,
  ICreateOrUpdateDailyEarnings,
  IPaginationDTO,
} from '@/dtos';

export default interface IDailyEarningsRepository {
  findAll(): Promise<DailyEarnings[] | undefined>;
  findAllPaginated({
    limit,
    page,
  }: IPaginationDTO): Promise<IPaginatedDailyEarningsDTO>;
  findById(id: string): Promise<DailyEarnings | undefined>;
  findByDate(date: Date): Promise<DailyEarnings | undefined>;
  create(data: ICreateDailyEarningDTO[]): Promise<DailyEarnings[]>;
  createOrUpdate(data: ICreateOrUpdateDailyEarnings): Promise<void>;
}
