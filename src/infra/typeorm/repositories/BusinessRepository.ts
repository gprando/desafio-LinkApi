import { ICreateBusinessDTO, IPaginatedBusinessDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import Business from '@/infra/typeorm/schemas/Business';
import IBusinessRepository from '@/repositories/IBusinessRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import AppError from '@/errors/AppError';

export default class BusinessRepository implements IBusinessRepository {
  private ormRepository: MongoRepository<Business>;

  constructor() {
    this.ormRepository = getMongoRepository(Business);
  }

  public async findById(id: string): Promise<Business | undefined> {
    if (!ObjectID.isValid(id)) {
      throw new AppError('Object id inválid');
    }

    const business = await this.ormRepository.findOne(id);

    return business;
  }

  public async findByCode(code: number): Promise<Business | undefined> {
    const business = await this.ormRepository.findOne({ where: { code } });

    return business;
  }

  public async findAll(): Promise<Business[] | undefined> {
    const foundBusiness = await this.ormRepository.find();

    return foundBusiness;
  }

  public async findAllPaginated({
    page = 1,
    limit = 10,
  }: IPaginationDTO): Promise<IPaginatedBusinessDTO> {
    const skippedItems = (page - 1) * limit;

    const totalCount = await this.ormRepository.count();
    const business = await this.ormRepository.find({
      skip: skippedItems,
      take: limit,
    });

    return {
      totalCount,
      page,
      limit,
      data: business,
    };
  }

  public async create(data: ICreateBusinessDTO[]): Promise<Business[]> {
    const arrayBusiness = data.map(d => {
      return this.ormRepository.create({
        add_time: d.add_time,
        client_email: d.client_email,
        client_name: d.client_name,
        client_phone: d.client_phone,
        code: d.code,
        creator_email: d.creator_email,
        creator_name: d.creator_name,
        creator_user_id: d.creator_user_id,
        currency: d.currency,
        status: d.status,
        title: d.title,
        value: d.value,
      });
    });

    await this.ormRepository.save(arrayBusiness);

    return arrayBusiness;
  }
}
