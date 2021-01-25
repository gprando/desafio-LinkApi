import {
  ICreateDailyEarningDTO,
  ICreateOrUpdateDailyEarnings,
  IPaginatedDailyEarningsDTO,
} from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import DailyEarnings from '@/infra/typeorm/schemas/DailyEarnings';
import IDailyEarningsRepository from '@/repositories/IDailyEarningsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import AppError from '@/errors/AppError';
import { formatDate } from '@/utils/helpers';

export default class DailyEarningsRepository
  implements IDailyEarningsRepository {
  private ormRepository: MongoRepository<DailyEarnings>;

  constructor() {
    this.ormRepository = getMongoRepository(DailyEarnings);
  }

  public async findById(id: string): Promise<DailyEarnings | undefined> {
    if (!ObjectID.isValid(id)) {
      throw new AppError('Object id inválid');
    }

    const dailyEarnings = await this.ormRepository.findOne(id);

    return dailyEarnings;
  }

  public async findByDate(date: Date): Promise<DailyEarnings | undefined> {
    const dailyEarnings = await this.ormRepository.findOne({ where: { date } });

    return dailyEarnings;
  }

  public async findAll(): Promise<DailyEarnings[] | undefined> {
    const foundDailyEarnings = await this.ormRepository.find();

    return foundDailyEarnings;
  }

  public async findAllPaginated({
    page = 1,
    limit = 10,
  }: IPaginationDTO): Promise<IPaginatedDailyEarningsDTO> {
    const skippedItems = (page - 1) * limit;

    const totalCount = await this.ormRepository.count();
    // const DailyEarnings = await this.ormRepository.find({ skip: skippedItems });
    const dailyEarnings = await this.ormRepository.find({
      skip: skippedItems,
      take: limit,
    });

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
    const arrayDailyEarnings = data.map(d => {
      return this.ormRepository.create({ day: d.day, total: d.total });
    });

    await this.ormRepository.save(arrayDailyEarnings);

    return arrayDailyEarnings;
  }

  public async createOrUpdate({
    objectTotalPerDayToSave,
    objectTotalPerDaySaved,
  }: ICreateOrUpdateDailyEarnings): Promise<void> {
    const totalPerDayCreated = Object.keys(objectTotalPerDayToSave).map(key => {
      const newTotalPerDay = this.ormRepository.create({
        day: objectTotalPerDayToSave[key].day,
        total: objectTotalPerDayToSave[key].total,
      });

      return newTotalPerDay;
    });

    const promiseFindSaved = Object.keys(objectTotalPerDaySaved).map(key => {
      const day = formatDate(objectTotalPerDaySaved[key].day);

      return this.ormRepository.findOne({ day });
    });

    const promiseResolved = await Promise.all(promiseFindSaved);
    const days = Object.keys(objectTotalPerDaySaved);
    promiseResolved.forEach(daily => {
      if (daily && days.includes(String(daily.day))) {
        const findDaily = promiseResolved.find(p => p?.day === daily.day);
        if (findDaily) {
          totalPerDayCreated.push({
            ...findDaily,
            total: findDaily.total + daily.total,
          });
        }
      }
    });

    await Promise.allSettled(
      totalPerDayCreated.map(t => this.ormRepository.save(t)),
    );
  }
}
