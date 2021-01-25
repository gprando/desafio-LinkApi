import DailyEarnings from '@/infra/typeorm/schemas/DailyEarnings';

export default interface IPaginatedDailyDTO {
  data: DailyEarnings[];
  page: number;
  limit: number;
  totalCount: number;
}
