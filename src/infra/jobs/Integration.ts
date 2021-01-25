/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import BlingProvider from '@/providers/BlingProvider/implementations/BlingProvider';
import PipedriveProvider from '@/providers/PipedriveProvider/implementations/PipedriveProvider';
import CreateBusinessService from '@/services/CreateBusinessService';
import BusinessRepository from '../typeorm/repositories/BusinessRepository';
import DailyEarningsRepository from '../typeorm/repositories/DailyEarningsRepository';

export default {
  key: 'integration',
  async handle() {
    const businessRepository = new BusinessRepository();
    const dailyEarningsRepository = new DailyEarningsRepository();
    const pipedriveProvider = new PipedriveProvider(businessRepository);
    const blingProvider = new BlingProvider();

    const createBusiness = new CreateBusinessService(
      businessRepository,
      dailyEarningsRepository,
      pipedriveProvider,
      blingProvider,
    );
    await createBusiness.execute();
  },
};
