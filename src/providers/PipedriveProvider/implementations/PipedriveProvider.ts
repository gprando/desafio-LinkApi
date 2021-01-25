import fetch from 'node-fetch';
import config from '@/config';

import AppError from '@/errors/AppError';
import IBusinessRepository from '@/repositories/IBusinessRepository';
import Business from '@/infra/typeorm/schemas/Business';
import IPipedriveProvider from '../models/IPipedriveProvider';
import IPipedriveDTO from '../dtos/IPipedriveDTO';
import IResponsePipedrive from '../dtos/IResponsePipedrive';

export default class PipedriveProvider implements IPipedriveProvider {
  private businessRepositor: IBusinessRepository;

  constructor(businessRepositor: IBusinessRepository) {
    this.businessRepositor = businessRepositor;
  }

  public async listAll(): Promise<IResponsePipedrive> {
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

    const dealsToSave: IPipedriveDTO[] = [];
    const dealsSaved: IPipedriveDTO[] = [];
    // const filteredDeals = data.filter(
    //   (deal: IPipedriveDTO) =>
    //     deal.status === 'won' &&
    //     !dealsInDatabase.find(d => d && d.code === deal.id),
    // ) as IPipedriveDTO[];

    data.forEach((deal: IPipedriveDTO) => {
      if (deal.status === 'won') {
        if (!dealsInDatabase.find(d => d && d.code === deal.id)) {
          dealsToSave.push(deal);
        } else {
          dealsSaved.push(deal);
        }
      }
    });

    return { saved: dealsSaved, toSave: dealsToSave };
  }
}
