import logger from '@/utils/logger';
import { ICreateBusinessDTO } from '@/dtos';
import IBlingProvider from '../models/IBlingProvider';

export default class FakeBlingProvider implements IBlingProvider {
  public async createBusiness(data: ICreateBusinessDTO[]): Promise<void> {
    logger.info(`created fake business: ${data}. into fake bling `);
  }
}
