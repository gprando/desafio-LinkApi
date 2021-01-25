import {
  IPaginatedDailyEarningsDTO,
  ICreateDailyEarningDTO,
  ICreateOrUpdateDailyEarnings,
} from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import AppError from '@/errors/AppError';
import DailyEarnings from '@/infra/typeorm/schemas/DailyEarnings';
import logger from '@/utils/logger';
import { ObjectID } from 'mongodb';
import IDailyEarningsRepository from '../IDailyEarningsRepository';

export default class FakeDailyEarningsRepository
  implements IDailyEarningsRepository {
  private dailyEarnings: DailyEarnings[] = [];

  public async findById(id: string): Promise<DailyEarnings | undefined> {
    if (!ObjectID.isValid(id)) {
      throw new AppError('Object id inválid');
    }
    const dailyEarnings = this.dailyEarnings.find(b => String(b.id) === id);

    return dailyEarnings;
  }

  public async findByDate(date: Date): Promise<DailyEarnings | undefined> {
    const dailyEarnings = this.dailyEarnings.find(
      d => d.day.getDay() === date.getDay(),
    );

    return dailyEarnings;
  }

  public async findAll(): Promise<DailyEarnings[] | undefined> {
    return this.dailyEarnings;
  }

  public async findAllPaginated({
    page = 1,
    limit = 10,
  }: IPaginationDTO): Promise<IPaginatedDailyEarningsDTO> {
    const skippedItems = (page - 1) * limit;

    const totalCount = this.dailyEarnings.length;
    const dailyEarnings: DailyEarnings[] = [];

    let i = skippedItems;

    const limitLoop =
      skippedItems + limit < totalCount ? skippedItems + limit : totalCount - 1;

    if (i === 0 && limitLoop === 0 && this.dailyEarnings[0]) {
      dailyEarnings.push(this.dailyEarnings[0]);
    }
    // eslint-disable-next-line no-plusplus
    for (i; i < limitLoop; i++) {
      dailyEarnings.push(this.dailyEarnings[i]);
    }

    return {
      totalCount,
      page,
      limit,
      data: dailyEarnings,
    };
  }

  public async create(
    data: ICreateDailyEarningDTO[],
  ): Promise<DailyEarnings[]> {
    const createdDailyEarnings = data.map(dailyEarnings => {
      const newDailyEarnings = new DailyEarnings();

      Object.assign(
        newDailyEarnings,
        { id: new ObjectID() },
        { day: dailyEarnings.day, total: dailyEarnings.total },
      );

      this.dailyEarnings.push(newDailyEarnings);
      return newDailyEarnings;
    });

    return createdDailyEarnings;
  }

  public async createOrUpdate({
    objectTotalPerDaySaved,
    objectTotalPerDayToSave,
  }: ICreateOrUpdateDailyEarnings): Promise<void> {
    logger.info(
      'created sucess',
      objectTotalPerDaySaved,
      objectTotalPerDayToSave,
    );
  }
}
