import IBlingProvider from '@/providers/BlingProvider/models/IBlingProvider';
import IPipedriveProvider from '@/providers/PipedriveProvider/models/IPipedriveProvider';
import IBusinessRepository from '@/repositories/IBusinessRepository';
import { ICreateBusinessDTO } from '@/dtos';
import { formatDate } from '@/utils/helpers';
import IDailyEarningsRepository from '@/repositories/IDailyEarningsRepository';
import { IObjectTotalPerDayToSave } from '@/dtos/ICreateOrUpdateDailyEarnings';

class CreateBusinessService {
  private businessRepository: IBusinessRepository;

  private dailyEarningsRepository: IDailyEarningsRepository;

  private pipedriveProvider: IPipedriveProvider;

  private blingProvider: IBlingProvider;

  constructor(
    businessRepository: IBusinessRepository,
    dailyEarningsRepository: IDailyEarningsRepository,
    pipedriveProvider: IPipedriveProvider,
    blingProvider: IBlingProvider,
  ) {
    this.businessRepository = businessRepository;
    this.dailyEarningsRepository = dailyEarningsRepository;
    this.pipedriveProvider = pipedriveProvider;
    this.blingProvider = blingProvider;
  }

  async execute(): Promise<{ message: string; status: string }> {
    const objectTotalPerDayToSave: IObjectTotalPerDayToSave = {};
    const objectTotalPerDaySaved: IObjectTotalPerDayToSave = {};
    const deals = await this.pipedriveProvider.listAll();

    deals.toSave.forEach(deal => {
      const day = formatDate(new Date(deal.add_time));
      if (Object.keys(objectTotalPerDayToSave).includes(String(day))) {
        objectTotalPerDayToSave[`${day}`] = {
          day,
          total: objectTotalPerDayToSave[`${day}`].total + deal.value,
        };
      } else {
        objectTotalPerDayToSave[`${day}`] = {
          day,
          total: deal.value,
        };
      }
    });

    deals.saved.forEach(deal => {
      const day = formatDate(new Date(deal.add_time));
      if (Object.keys(objectTotalPerDayToSave).includes(String(day))) {
        objectTotalPerDaySaved[`${day}`] = {
          day,
          total:
            objectTotalPerDaySaved[`${day}`].total +
            objectTotalPerDayToSave[`${day}`].total,
        };

        delete objectTotalPerDayToSave[`${day}`];
      }
      if (Object.keys(objectTotalPerDaySaved).includes(String(day))) {
        objectTotalPerDaySaved[`${day}`] = {
          day,
          total: objectTotalPerDaySaved[`${day}`].total + deal.value,
        };
      } else {
        objectTotalPerDaySaved[`${day}`] = {
          day,
          total: deal.value,
        };
      }
    });

    const serealizedDeals = deals.toSave.map(deal => {
      return {
        add_time: deal.add_time,
        client_email: deal.person_id.email[0].value,
        client_name: deal.person_id.name,
        client_phone: deal.person_id.phone[0].value,
        code: deal.id,
        creator_email: deal.creator_user_id.email,
        creator_name: deal.creator_user_id.name,
        creator_user_id: String(deal.creator_user_id.id),
        currency: deal.currency,
        status: deal.status,
        title: deal.title,
        value: deal.value,
      } as ICreateBusinessDTO;
    });

    await this.dailyEarningsRepository.createOrUpdate({
      objectTotalPerDayToSave,
      objectTotalPerDaySaved,
    });

    await this.businessRepository.create(serealizedDeals);

    await this.blingProvider.createBusiness(serealizedDeals);

    return {
      status: 'sucess',
      message: 'success in integrating',
    };
  }
}

export default CreateBusinessService;
