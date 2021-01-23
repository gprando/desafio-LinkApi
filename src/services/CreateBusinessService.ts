import IBlingProvider from '@/providers/BlingProvider/models/IBlingProvider';
import IPipedriveProvider from '@/providers/PipedriveProvider/models/IPipedriveProvider';
import IBusinessRepository from '@/repositories/IBusinessRepository';
import { ICreateBusinessDTO } from '@/dtos';

class CreateBusinessService {
  private businessRepository: IBusinessRepository;

  private pipedriveProvider: IPipedriveProvider;

  private blingProvider: IBlingProvider;

  constructor(
    businessRepository: IBusinessRepository,
    pipedriveProvider: IPipedriveProvider,
    blingProvider: IBlingProvider,
  ) {
    this.businessRepository = businessRepository;
    this.pipedriveProvider = pipedriveProvider;
    this.blingProvider = blingProvider;
  }

  async execute(): Promise<{ message: string; status: string }> {
    const deals = await this.pipedriveProvider.listAll();

    const serealizedDeals = deals.map(deal => {
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

    await this.businessRepository.create(serealizedDeals);

    await this.blingProvider.createBusiness(serealizedDeals);

    return {
      status: 'sucess',
      message: 'success in integrating',
    };
  }
}

export default CreateBusinessService;
