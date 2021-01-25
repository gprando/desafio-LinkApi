import { ICreateBusinessDTO, IPaginatedBusinessDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import AppError from '@/errors/AppError';
import Business from '@/infra/typeorm/schemas/Business';
import { ObjectID } from 'mongodb';
import IBusinessRepository from '../IBusinessRepository';

export default class FakeBusinessRepository implements IBusinessRepository {
  private business: Business[] = [];

  public async findById(id: string): Promise<Business | undefined> {
    if (!ObjectID.isValid(id)) {
      throw new AppError('Object id inválid');
    }
    const business = this.business.find(b => String(b.id) === id);

    return business;
  }

  public async findByCode(code: number): Promise<Business | undefined> {
    const business = this.business.find(b => b.code === code);

    return business;
  }

  public async findAll(): Promise<Business[] | undefined> {
    return this.business;
  }

  public async findAllPaginated({
    page = 1,
    limit = 10,
  }: IPaginationDTO): Promise<IPaginatedBusinessDTO> {
    const skippedItems = (page - 1) * limit;

    const totalCount = this.business.length;
    const business: Business[] = [];

    let i = skippedItems;

    const limitLoop =
      skippedItems + limit < totalCount ? skippedItems + limit : totalCount - 1;

    if (i === 0 && limitLoop === 0 && this.business[0]) {
      business.push(this.business[0]);
    }
    // eslint-disable-next-line no-plusplus
    for (i; i < limitLoop; i++) {
      business.push(this.business[i]);
    }

    return {
      totalCount,
      page,
      limit,
      data: business,
    };
  }

  public async create(data: ICreateBusinessDTO[]): Promise<Business[]> {
    const createdBusiness = data.map(business => {
      const newBusiness = new Business();

      Object.assign(
        newBusiness,
        { id: new ObjectID() },
        {
          add_time: business.add_time,
          client_email: business.client_email,
          client_name: business.client_name,
          client_phone: business.client_phone,
          code: business.code,
          creator_email: business.creator_email,
          creator_name: business.creator_name,
          creator_user_id: business.creator_user_id,
          currency: business.currency,
          status: business.status,
          title: business.title,
          value: business.value,
        },
      );

      this.business.push(newBusiness);
      return newBusiness;
    });

    return createdBusiness;
  }
}
