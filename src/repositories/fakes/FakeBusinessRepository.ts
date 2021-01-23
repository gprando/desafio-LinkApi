import { ICreateBusinessDTO, IPaginatedBusinessDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import Business from '@/infra/typeorm/entities/Business';
import { ObjectID } from 'typeorm';
import IBusinessRepository from '../IBusinessRepository';

export default class FakeBusinessRepository implements IBusinessRepository {
  private business: Business[] = [];

  public async findById(id: ObjectID): Promise<Business | undefined> {
    const business = this.business.find(b => b.id === id);

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

  public async create({
    add_time,
    client_email,
    client_name,
    client_phone,
    code,
    creator_email,
    creator_name,
    creator_user_id,
    currency,
    status,
    title,
    value,
  }: ICreateBusinessDTO): Promise<Business> {
    const business = new Business();

    Object.assign(
      business,
      { id: new ObjectID() },
      {
        add_time,
        client_email,
        client_name,
        client_phone,
        code,
        creator_email,
        creator_name,
        creator_user_id,
        currency,
        status,
        title,
        value,
      },
    );

    this.business.push(business);

    return business;
  }
}
