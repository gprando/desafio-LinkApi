import Business from '@/infra/typeorm/schemas/Business';

export default interface IPaginatedBusinessDTO {
  data: Business[];
  page: number;
  limit: number;
  totalCount: number;
}
