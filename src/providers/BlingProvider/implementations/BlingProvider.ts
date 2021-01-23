import fetch from 'node-fetch';
import config from '@/config';
import { ICreateBusinessDTO } from '@/dtos';
import { createXML } from '@/utils/helpers';
import logger from '@/utils/logger';
import IBlingProvider from '../models/IBlingProvider';

export default class BlingProvider implements IBlingProvider {
  public async createBusiness(data: ICreateBusinessDTO[]): Promise<void> {
    const result = await Promise.allSettled([
      ...data.map(d =>
        fetch(
          `${config.blingUrl}/pedido/json/?apikey=${
            config.blingKey
          }&xml=${createXML(d)}`,
          { method: 'POST' },
        ),
      ),
    ]);

    result.forEach(r => {
      if (r.status === 'rejected') {
        logger.error(`error sending xml to bling, request: ${r.reason}`);
      }
    });
  }
}
