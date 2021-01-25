import AppError from '@/errors/AppError';
import FakeBusinessRepository from '@/repositories/fakes/FakeBusinessRepository';
import ListBusinessByIdService from './ListBusinessByIdService';

let fakeBusinessRepository: FakeBusinessRepository;
let listBusinessById: ListBusinessByIdService;

describe('ListBusinessById', () => {
  beforeEach(() => {
    fakeBusinessRepository = new FakeBusinessRepository();

    listBusinessById = new ListBusinessByIdService(fakeBusinessRepository);
  });

  it('should not be able to show the company by id if it does not exist', async () => {
    await expect(listBusinessById.execute('')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able show the business per id', async () => {
    const created_business = await fakeBusinessRepository.create([
      {
        code: 1,
        creator_user_id: '11978749',
        creator_name: 'Gabriel Prando',
        creator_email: 'gprando55@gmail.com',
        client_name: 'gabriel',
        client_email: 'gabriel.prando@gmail.com',
        client_phone: '46999039412',
        title: 'teste',
        add_time: '2021-01-21 23:25:32',
        value: 1200,
        currency: 'BRL',
        status: 'won',
      },
    ]);

    const business = await listBusinessById.execute(
      String(created_business[0].id),
    );

    expect(business?.status).toBe('won');
    expect(business?.code).toBe(1);
  });
});
