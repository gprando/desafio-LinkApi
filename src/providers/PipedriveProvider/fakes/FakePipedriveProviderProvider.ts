import IPipedriveProvider from '../models/IPipedriveProvider';
import IPipedriveDTO from '../dtos/IPipedriveDTO';

export default class FakePipedriveProvider implements IPipedriveProvider {
  public async listAll(): Promise<IPipedriveDTO[]> {
    const fakeDeal = {
      id: 1,
      creator_user_id: {
        id: 11978749,
        name: 'Gabriel Prando',
        email: 'gprando55@gmail.com',
        active_flag: true,
        value: 11978749,
      },
      person_id: {
        active_flag: true,
        name: 'gabriel',
        email: [
          {
            label: 'work',
            value: 'gabriel.prando@gmail.com',
            primary: true,
          },
        ],
        phone: [
          {
            label: 'work',
            value: '46999039412',
            primary: true,
          },
        ],
      },

      title: 'teste',
      value: 1200,
      currency: 'BRL',
      add_time: '2021-01-21 23:25:32',
      status: 'won',
    } as IPipedriveDTO;

    return [fakeDeal];
  }
}
