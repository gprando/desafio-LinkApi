import FakeDailyEarningsRepository from '@/repositories/fakes/FakeDailyEarningsRepository';
import ListAllDailyEarningsService from './ListAllDailyEarningsService';

let fakeDailyEarningsRepository: FakeDailyEarningsRepository;
let listAllDailyEarnings: ListAllDailyEarningsService;

describe('ListAllDailyEarnings', () => {
  beforeEach(() => {
    fakeDailyEarningsRepository = new FakeDailyEarningsRepository();

    listAllDailyEarnings = new ListAllDailyEarningsService(
      fakeDailyEarningsRepository,
    );
  });

  it('should be able to list all earnings per day in a paginated way', async () => {
    await fakeDailyEarningsRepository.create([
      {
        day: new Date(),
        total: 1200,
      },
      {
        day: new Date(),
        total: 1200,
      },
    ]);

    const response = await listAllDailyEarnings.execute({});

    expect(response.page).toBe(1);
    expect(response.limit).toBe(10);
  });
});
