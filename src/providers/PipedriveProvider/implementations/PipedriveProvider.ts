import fetch from 'node-fetch';
import config from '@/config';

import AppError from '@/errors/AppError';
import IBusinessRepository from '@/repositories/IBusinessRepository';
import Business from '@/infra/typeorm/entities/Business';
import IPipedriveProvider from '../models/IPipedriveProvider';
import IPipedriveDTO from '../dtos/IPipedriveDTO';

export default class PipedriveProvider implements IPipedriveProvider {
  private businessRepositor: IBusinessRepository;

  constructor(businessRepositor: IBusinessRepository) {
    this.businessRepositor = businessRepositor;
  }

  public async listAll(): Promise<IPipedriveDTO[]> {
    const { data } = await (
      await fetch(
        `${config.pipedriveUrl}/deals?api_token=${config.pipedriveToken}`,
        { method: 'GET' },
      )
    ).json();
    if (!data) {
      throw new AppError('Error when querying on Pipedrive');
    }

    const dealsInDatabase: Business[] = await Promise.all(
      data.map((d: IPipedriveDTO) => this.businessRepositor.findByCode(d.id)),
    );

    const filteredDeals = data.filter(
      (deal: IPipedriveDTO) =>
        deal.status === 'won' &&
        !dealsInDatabase.find(d => d && d.code === deal.id),
    ) as IPipedriveDTO[];

    return filteredDeals;
  }
}
